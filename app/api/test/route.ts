import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {
    // Test the connection with a simple query
    const result = await pool.query('SELECT NOW() as current_time, version() as db_version')
    
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      timestamp: result.rows[0].current_time,
      databaseVersion: result.rows[0].db_version,
      connectionInfo: {
        host: "31.97.180.12",
        port: 5432,
        database: "postgres",
        user: "postgres"
      }
    })
  } catch (error) {
    console.error("Database connection test failed:", error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        connectionInfo: {
          host: "31.97.180.12",
          port: 5432,
          database: "postgres",
          user: "postgres"
        }
      },
      { status: 500 }
    )
  }
}
