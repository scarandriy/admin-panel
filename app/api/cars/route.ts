import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        c.id,
        c.name,
        c.brand,
        c.model,
        c.year,
        c.color,
        c.price_per_day,
        c.description,
        c.features,
        c.is_available,
        c.engine_litrage,
        c.hp,
        c.created_at,
        c.updated_at,
        ci.image_url,
        ci.is_primary
      FROM cars c
      LEFT JOIN car_images ci ON c.id = ci.car_id AND ci.is_primary = true
      ORDER BY c.created_at DESC
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching cars:", error)
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    )
  }
}
