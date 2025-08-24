import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {
    // Check if cars table exists
    const carsTableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'cars'
      ) as cars_table_exists
    `)

    // Check if car_images table exists
    const carImagesTableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'car_images'
      ) as car_images_table_exists
    `)

    // Get table structure if cars table exists
    let carsTableStructure = null
    if (carsTableCheck.rows[0].cars_table_exists) {
      const structure = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'cars' 
        ORDER BY ordinal_position
      `)
      carsTableStructure = structure.rows
    }

    // Get sample data if cars table exists
    let sampleData = null
    if (carsTableCheck.rows[0].cars_table_exists) {
      const sample = await pool.query('SELECT COUNT(*) as total_count FROM cars')
      sampleData = {
        totalCount: parseInt(sample.rows[0].total_count)
      }
    }

    return NextResponse.json({
      success: true,
      tables: {
        cars: carsTableCheck.rows[0].cars_table_exists,
        car_images: carImagesTableCheck.rows[0].car_images_table_exists
      },
      carsTableStructure,
      sampleData,
      connectionInfo: {
        host: "31.97.180.12",
        port: 5432,
        database: "postgres"
      }
    })
  } catch (error) {
    console.error("Table check failed:", error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
