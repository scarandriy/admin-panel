"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconCar, IconCheck, IconX } from "@tabler/icons-react"

interface CarsStats {
  total: number
  available: number
  unavailable: number
}

async function fetchCarsStats(): Promise<CarsStats> {
  const response = await fetch("/api/cars/stats")
  if (!response.ok) {
    throw new Error("Failed to fetch cars statistics")
  }
  return response.json()
}

export default function CarsPage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["cars-stats"],
    queryFn: fetchCarsStats,
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
          <p className="text-muted-foreground">
            Manage your car fleet and view statistics.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">Loading...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
          <p className="text-muted-foreground">
            Manage your car fleet and view statistics.
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              Error loading cars statistics. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
        <p className="text-muted-foreground">
          Manage your car fleet and view statistics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <IconCar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              Cars in fleet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Cars</CardTitle>
            <IconCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.available || 0}</div>
            <p className="text-xs text-muted-foreground">
              Ready for rental
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unavailable Cars</CardTitle>
            <IconX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.unavailable || 0}</div>
            <p className="text-xs text-muted-foreground">
              Currently rented or maintenance
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Car Fleet Overview</CardTitle>
            <CardDescription>
              Current status of your car rental fleet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Utilization Rate</span>
                <span className="text-sm font-medium">
                  {stats ? Math.round((stats.unavailable / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Availability Rate</span>
                <span className="text-sm font-medium">
                  {stats ? Math.round((stats.available / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fleet Size</span>
                <span className="text-sm font-medium">{stats?.total || 0} vehicles</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common car management tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left p-2 rounded-md hover:bg-accent text-sm">
              Add New Car
            </button>
            <button className="w-full text-left p-2 rounded-md hover:bg-accent text-sm">
              View All Cars
            </button>
            <button className="w-full text-left p-2 rounded-md hover:bg-accent text-sm">
              Maintenance Schedule
            </button>
            <button className="w-full text-left p-2 rounded-md hover:bg-accent text-sm">
              Generate Report
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
