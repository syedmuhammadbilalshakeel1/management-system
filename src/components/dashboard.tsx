'use client'

import { ArrowDownIcon, ArrowUpIcon, MailIcon, Users, MousePointerClick } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const metrics = [
  {
    title: "Total Subscribers",
    value: "71,897",
    change: "+122",
    changeType: "increase",
    icon: Users,
  },
  {
    title: "Avg. Open Rate",
    value: "58.16%",
    change: "+5.4%",
    changeType: "increase",
    icon: MailIcon,
  },
  {
    title: "Avg. Click Rate",
    value: "24.57%",
    change: "-3.2%",
    changeType: "decrease",
    icon: MousePointerClick,
  },
]

const users = [
  { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
  { name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com", role: "Admin" },
  { name: "Tom Cook", title: "Director of Product", email: "tom.cook@example.com", role: "Member" },
  { name: "Whitney Francis", title: "Copywriter", email: "whitney.francis@example.com", role: "Admin" },
  { name: "Leonard Krasner", title: "Senior Designer", email: "leonard.krasner@example.com", role: "Owner" },
  { name: "Floyd Miles", title: "Principal Designer", email: "floyd.miles@example.com", role: "Member" },
]

export function DashboardComponent() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Last 30 days</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={metric.changeType === "increase" ? "text-green-600" : "text-red-600"}>
                    {metric.changeType === "increase" ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />}
                    {metric.change}
                  </span>{" "}
                  from last month
                </p>
                <Button variant="link" className="p-0 h-auto text-sm text-blue-600">
                  View all
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Users</h2>
            <p className="text-muted-foreground">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>
          <Button>Add user</Button>
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.title}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" className="p-0 h-auto text-blue-600">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}