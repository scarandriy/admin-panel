import { NextResponse, NextRequest } from "next/server"
import pool from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get total cars count
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM cars')
    const total = parseInt(totalResult.rows[0].total)

    // Get available cars count
    const availableResult = await pool.query('SELECT COUNT(*) as available FROM cars WHERE is_available = true')
    const available = parseInt(availableResult.rows[0].available)

    // Get unavailable cars count
    const unavailableResult = await pool.query('SELECT COUNT(*) as unavailable FROM cars WHERE is_available = false')
    const unavailable = parseInt(unavailableResult.rows[0].unavailable)

    const stats = {
      total,
      available,
      unavailable,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching cars stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch cars statistics" },
      { status: 500 }
    )
  }
}
