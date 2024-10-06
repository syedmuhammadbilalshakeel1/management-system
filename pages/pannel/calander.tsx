"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Event {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  attendees: string[];
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Meeting With Jundinu Tech",
    date: new Date(2024, 0, 4),
    startTime: "08:00",
    endTime: "09:30",
    attendees: ["JD", "AT", "BK"],
  },
  {
    id: 2,
    title: "Meeting With Nonuda Company",
    date: new Date(2024, 0, 4),
    startTime: "10:00",
    endTime: "11:00",
    attendees: ["NC", "MR", "EL"],
  },
  {
    id: 3,
    title: "Meeting With Nonuda Company",
    date: new Date(2024, 0, 4),
    startTime: "14:00",
    endTime: "15:00",
    attendees: ["NC", "MR", "EL"],
  },
];

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: string) => void;
}

function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onYearChange,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 ">
      <Button variant="ghost"  size="icon" onClick={onPrevMonth}>
        <ChevronLeft className="h-4 w-4 " />
      </Button>
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-semibold">
          {months[currentDate.getMonth()]}
        </h2>
        <Select
          onValueChange={onYearChange}
          defaultValue={currentDate.getFullYear().toString()}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue>{currentDate.getFullYear()}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Array.from(
              { length: 10 },
              (_, i) => currentDate.getFullYear() - 5 + i
            ).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button variant="ghost" size="icon" onClick={onNextMonth}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface CalendarGridProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
  events: Event[];
}

function CalendarGrid({
  currentDate,
  onSelectDate,
  events,
}: CalendarGridProps) {
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Adjust to start week on Monday

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  return (
    <div className="grid grid-cols-7 gap-1 text-sm">
      {daysOfWeek.map((day) => (
        <div key={day} className="text-center font-medium text-gray-400">
          {day}
        </div>
      ))}
      {Array(startingDayIndex)
        .fill(null)
        .map((_, index) => (
          <div key={`empty-${index}`} className="h-8" />
        ))}
      {days.map((day) => {
        const isSelected =
          day.getDate() === currentDate.getDate() &&
          day.getMonth() === currentDate.getMonth() &&
          day.getFullYear() === currentDate.getFullYear();
        const hasEvents = events.some(
          (event) => event.date.toDateString() === day.toDateString()
        );
        return (
          <Button
            key={day.toISOString()}
            variant="ghost"
            className={cn(
              "h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600 transition-colors",
              isSelected && "bg-blue-100 text-blue-600",
              hasEvents && "font-bold"
            )}
            onClick={() => onSelectDate(day)}
          >
            {day.getDate()}
          </Button>
        );
      })}
    </div>
  );
}

interface EventListProps {
  events: Event[];
}

function EventList({ events }: EventListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Next Event</h3>
      {events.map((event) => (
        <Card key={event.id} className="mb-2 bg-white shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-semibold">{event.title}</h4>
            <p className="text-sm text-gray-500">
              {event.date.toLocaleDateString()}
            </p>
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm text-gray-500">
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex mt-2">
              {event.attendees.map((attendee, index) => (
                <Avatar
                  key={index}
                  className="h-6 w-6 -ml-2 first:ml-0 border-2 border-white"
                >
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                    {attendee}
                  </AvatarFallback>
                </Avatar>
              ))}
              <span className="text-sm text-gray-500 ml-2">
                {event.attendees.length} people
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface DailyScheduleProps {
  events: Event[];
  currentDate: Date;
}

function DailySchedule({ events, currentDate }: DailyScheduleProps) {
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  return (
    <div className="flex-1 ml-6">
      {timeSlots.map((hour) => {
        const timeString = `${hour.toString().padStart(2, "0")}:00`;
        const eventAtThisHour = events.find(
          (e) =>
            e.startTime === timeString &&
            e.date.toDateString() === currentDate.toDateString()
        );

        return (
          <div key={hour} className="flex mb-4">
            <div className="w-16 text-right text-sm text-gray-400 pr-4">
              {timeString}
            </div>
            <div className="flex-1 min-h-[40px]">
              {eventAtThisHour && (
                <Card
                  className={`p-2 ${
                    eventAtThisHour.title.includes("Jundinu")
                      ? "bg-red-50"
                      : "bg-blue-50"
                  }`}
                >
                  <CardContent className="p-2">
                    <h4 className="font-semibold">{eventAtThisHour.title}</h4>
                    <p className="text-sm text-gray-500">
                      {eventAtThisHour.date.toLocaleDateString()}
                    </p>
                    <div className="flex mt-2">
                      {eventAtThisHour.attendees.map((attendee, index) => (
                        <Avatar
                          key={index}
                          className="h-6 w-6 -ml-2 first:ml-0 border-2 border-white"
                        >
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                            {attendee}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Event) => void;
}

function AddEventDialog({ isOpen, onClose, onAddEvent }: AddEventDialogProps) {
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    attendees: [],
  });

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const attendeesArray =
  //       typeof newEvent.attendees === "string"
  //         ? newEvent.attendees.split(",").map((a :any) => a.trim())
  //         : newEvent.attendees;
  //     onAddEvent({
  //       ...newEvent,
  //       id: Date.now(),
  //       attendees: attendeesArray,
  //     });
  //     onClose();
  //   };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const attendeesArray =
      typeof newEvent.attendees === "string"
        ? (newEvent.attendees as string).split(",").map((a: any) => a.trim())
        : newEvent.attendees;
    onAddEvent({
      ...newEvent,
      id: Date.now(),
      attendees: attendeesArray,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white  ">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={newEvent.date.toISOString().split("T")[0]}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: new Date(e.target.value) })
              }
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="attendees">Attendees (comma-separated)</Label>
            <Input
              id="attendees"
              value={newEvent.attendees.join(", ")}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  attendees: e.target.value.split(",").map((a) => a.trim()),
                })
              }
            />
          </div>
          <Button type="submit" className="text-white bg-black">
            Add Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function PannalCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2024, 0, 2)); // January 2, 2024
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] =
    useState<boolean>(false);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleYearChange = (year: string) => {
    setCurrentDate(new Date(parseInt(year), currentDate.getMonth(), 1));
  };

  const handleSelectDate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="flex p-6 bg-white rounded-lg shadow-lg">
      <div className="w-64">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onYearChange={handleYearChange}
        />
        <CalendarGrid
          currentDate={currentDate}
          onSelectDate={handleSelectDate}
          events={events}
        />
        <EventList
          events={events.filter(
            (e) => e.date.toDateString() === currentDate.toDateString()
          )}
        />
        <Button
          onClick={() => setIsAddEventDialogOpen(true)}
          className="w-full mt-4 bg-black text-white "
        >
          <Plus className="mr-2 h-4 w-4 text-white" />
          Add Event
        </Button>
      </div>
      <DailySchedule events={events} currentDate={currentDate} />
      <AddEventDialog
        isOpen={isAddEventDialogOpen}
        onClose={() => setIsAddEventDialogOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
