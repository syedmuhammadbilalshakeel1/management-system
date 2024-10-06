/**
 * The `Dashboard` function in this TypeScript React component renders a dashboard layout with sidebar
 * navigation and main content area, including user profile grid and user case components.
 * @returns The `Dashboard` component is being returned. It consists of a sidebar with navigation
 * links, a main content section with a search input, buttons for notifications and user profile
 * dropdown menu, and a main dashboard content section that includes components like `UserProfileGrid`.
 */

import {
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  PieChart,
  Search,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Pannel from "./pannel/pannelD1"
import UserProfileGrid from "./pannel/profile";
import UserCase from "./pannel/userCase";
import PannalCalendar from "./pannel/calander"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { stringify } from "querystring";

export default function Dashboard() {
  return (
    <div className="flex h-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] text-white p-6">
        <div className="mb-8">
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <nav className="space-y-4">
          <Link
            href="#"
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
          >
            <Users className="w-5 h-5" />
            <span>Team</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
          >
            <FileText className="w-5 h-5" />
            <span>Add User Case</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
          >
            <Calendar className="w-5 h-5" />
            <span>Calendar</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
          >
            <FileText className="w-5 h-5" />
            <span>Documents</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
          >
            <PieChart className="w-5 h-5" />
            <span>Reports</span>
          </Link>
        </nav>
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Your teams
          </h3>
          <nav className="mt-4 space-y-2">
            <Link
              href="#"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
            >
              <span className="w-5 h-5 rounded bg-indigo-500 flex items-center justify-center text-xs font-medium">
                H
              </span>
              <span>Heroicons</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
            >
              <span className="w-5 h-5 rounded bg-cyan-500 flex items-center justify-center text-xs font-medium">
                T
              </span>
              <span>Tailwind Labs</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
            >
              {/* <span className="w-5 h-5 rounded bg-gray-500 flex items-center justify-center text-xs font-medium">
                W
              </span>
              <span>Workcation</span> */}
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 w-64 rounded-md bg-white"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Image
                    src="/placeholder.svg"
                    alt="Tom Cook"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>Tom Cook</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Main dashboard content */}
        {/* {DashboardPannel} */}
        <div className="bg-white shadow rounded-lg p-6">
          {Pannel()}
          {/* {UserProfileGrid()} */}
          {/* {PannalCalendar()} */}
          {/* <PannalCalendar/> */}
          {/* {UserCase()} */}
        </div>
      </main>
    </div>
  );
}
