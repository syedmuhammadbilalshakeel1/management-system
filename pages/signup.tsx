import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUpForm() {
  return (
    <div className="flex min-h-screen bg-white">
      <div
        className="hidden md:block md:w-1/2 bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1520243947988-b7b79f7873e9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDd8fGJsYWNrJTIwZm9yZXN0fGVufDB8fDB8eWVsbG93&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60)",
        }}
      />
      <div className="w-full md:w-1/2 max-w-lg mx-auto my-12 px-4 py-5 shadow-none">
        <div className="text-left p-0 font-sans">
          <h1 className="text-gray-800 text-3xl font-medium">
            Create an account for free
          </h1>
          <h3 className="p-1 text-gray-700">
            Free forever. No payment needed.
          </h3>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Acme Inc." required />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              By creating an account you are agreeing to our{" "}
              <Link href="#" className="underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Sign up with email
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Link href="#" className="text-sm text-gray-600 hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
