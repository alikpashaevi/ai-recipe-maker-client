"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AdminService, type AdminUser } from "@/lib/admin"
import { AuthService } from "@/lib/auth"
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"

export function UsersTable() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const pageSize = 10

  useEffect(() => {
    loadUsers(currentPage)
  }, [currentPage])

  const loadUsers = async (page: number) => {
    setIsLoading(true)
    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      const response = await AdminService.getUsers(page, pageSize, token)
      setUsers(response.content)
      setTotalPages(response.totalPages)
      setTotalUsers(response.totalElements)
    } catch (err) {
      setError("Failed to load users")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage all registered users ({totalUsers.toLocaleString()} total)</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Roles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.provider === "LOCAL" ? "default" : "secondary"}>{user.provider}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {user.roles.map((role) => (
                            <Badge key={role.id} variant={role.name === "ADMIN" ? "destructive" : "outline"}>
                              {role.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage + 1} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 0}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
