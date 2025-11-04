"use client"
import { useEffect, useState } from "react"
import { Button } from "@heroui/button"
import { Card, CardBody, CardFooter } from "@heroui/card"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table"
import { Pagination } from "@heroui/pagination"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown"
import { useToast } from "@/components/toast-provider"
import { api } from "@/api/api"
import { Booking, Event } from "@/api/types"
import { format } from "date-fns"
import { Filter, MoreVertical } from "lucide-react"


export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const { error } = useToast()
  const itemsPerPage = 10

  useEffect(() => {
    fetchBookings()
  }, [currentPage, statusFilter])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      // In a real implementation, you would include query parameters for pagination and filtering
      const response = await api.get('/bookings/my-events')
      const data = await response.data
      setBookings(data || [])
      // In a real implementation, you would use pagination from the API
      setTotalPages(Math.ceil(data.length / itemsPerPage))
    } catch (err) {
      console.error("Failed to fetch bookings:", err)
      error("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  // Filter and paginate bookings
  const filteredBookings = statusFilter 
    ? bookings.filter(booking => booking.status.toLowerCase() === statusFilter.toLowerCase())
    : bookings

  const indexOfLastBooking = currentPage * itemsPerPage
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking)

  // Calculate total revenue
  const totalRevenue = bookings.reduce((sum, booking) => {
    return sum + (booking.ticket?.price || 0)
  }, 0)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Event Bookings</h1>
          <p className="text-default-600">Manage bookings for your events</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-default-100 p-3 rounded-lg">
            <p className="text-sm text-default-600">Total Revenue</p>
            <p className="text-xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                startContent={<Filter size={16} />}
              >
                {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Status filter options">
              <DropdownItem key="all" onClick={() => handleStatusFilter(null)}>
                All Statuses
              </DropdownItem>
              <DropdownItem key="confirmed" onClick={() => handleStatusFilter("confirmed")}>
                Confirmed
              </DropdownItem>
              <DropdownItem key="pending" onClick={() => handleStatusFilter("pending")}>
                Pending
              </DropdownItem>
              <DropdownItem key="cancelled" onClick={() => handleStatusFilter("cancelled")}>
                Cancelled
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <Card className="w-full">
        <CardBody>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
              <p className="text-default-600">There are no bookings for your events yet.</p>
            </div>
          ) : (
            <Table aria-label="Bookings table">
              <TableHeader>
                <TableColumn>BOOKING ID</TableColumn>
                <TableColumn>EVENT</TableColumn>
                <TableColumn>CUSTOMER</TableColumn>
                <TableColumn>TICKET</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>AMOUNT</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {currentBookings.map((booking) => {
                  const bookingDate = new Date(booking.bookingDate)
                  
                  return (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <span className="font-medium">#{booking.id}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{booking.event.name}</span>
                          <span className="text-xs text-default-500">
                            {format(new Date(booking.event.startDate), "MMM d, yyyy")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{booking.user.name}</span>
                          <span className="text-xs text-default-500">{booking.user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{booking.ticket.name}</span>
                          <span className="text-xs text-default-500">Qty: 1</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(bookingDate, "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${booking.ticket.price.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardBody>
        {bookings.length > 0 && (
          <CardFooter className="flex justify-center">
            <Pagination
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
            />
          </CardFooter>
        )}
      </Card>
    </div>
  )
}