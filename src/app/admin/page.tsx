"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  CalendarDays,
  BarChart3,
  Briefcase,
  FileText,
  Settings,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Search,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PackageOpen,
  IndianRupee,
  UserCheck,
  Clock,
  Send,
  Plus,
  Filter,
  Map,
} from "lucide-react";

import { useAuth, type User } from "@/lib/auth-context";
import { useCart, type Booking } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

type AdminTab =
  | "dashboard"
  | "users"
  | "bookings"
  | "analytics"
  | "providers"
  | "content"
  | "settings";

const navItems: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "users", label: "Users", icon: Users },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "providers", label: "Providers", icon: Briefcase },
  { id: "content", label: "Content", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ========================== Page ========================== */
export default function AdminPage() {
  const { user, isAdmin, isLoading, allUsers, logout } = useAuth();
  const { bookings } = useCart();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-border bg-[#0f172a] px-4 py-3 md:hidden">
        <span className="text-lg font-bold text-white">KuboVista Admin</span>
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/80 hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed inset-y-0 left-0 z-40 w-64 bg-[#0f172a] pt-14 md:static md:block md:pt-0`}
      >
        <div className="flex h-full flex-col px-3 py-4">
          <div className="mb-6 hidden items-center gap-2 px-3 md:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
              KV
            </div>
            <span className="text-lg font-bold text-white">KuboVista Admin</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-primary text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
            <div className="px-3">
              <p className="text-xs text-slate-400">Signed in as</p>
              <p className="truncate text-sm font-medium text-white">
                {user?.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <main className="flex-1 bg-background">
        <Container className="py-6 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "dashboard" && <DashboardTab allUsers={allUsers} bookings={bookings} />}
              {activeTab === "users" && <UsersTab allUsers={allUsers} />}
              {activeTab === "bookings" && <BookingsTabAdmin bookings={bookings} />}
              {activeTab === "analytics" && <AnalyticsTab />}
              {activeTab === "providers" && <ProvidersTab allUsers={allUsers} />}
              {activeTab === "content" && <ContentTab />}
              {activeTab === "settings" && <AdminSettingsTab />}
            </motion.div>
          </AnimatePresence>
        </Container>
      </main>
    </div>
  );
}

/* ========================== Access Denied ========================== */
function AccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-danger/10 mx-auto">
          <AlertCircle className="h-8 w-8 text-danger" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Access Denied
        </h2>
        <p className="mb-8 text-muted-foreground">
          You need admin privileges to view this page. Contact your administrator
          if you believe this is an error.
        </p>
        <Link href="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}

/* ========================== Dashboard Tab ========================== */
function DashboardTab({
  allUsers,
  bookings,
}: {
  allUsers: User[];
  bookings: Booking[];
}) {
  const totalUsers = allUsers.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((s, b) => s + b.totalAmount, 0);
  const pendingVerifications = allUsers.filter(
    (u) => u.verificationStatus === "pending"
  ).length;

  const recentBookings = [...bookings].sort(
    (a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
  ).slice(0, 5);

  const recentUsers = [...allUsers].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Overview of KuboVista platform activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={totalUsers.toString()}
          change="+12%"
          positive
          icon={Users}
        />
        <StatCard
          title="Total Bookings"
          value={totalBookings.toString()}
          change="+8%"
          positive
          icon={CalendarDays}
        />
        <StatCard
          title="Total Revenue"
          value={formatINR(totalRevenue)}
          change="+15%"
          positive
          icon={IndianRupee}
        />
        <StatCard
          title="Pending Verifications"
          value={pendingVerifications.toString()}
          change="-3"
          positive={pendingVerifications === 0}
          icon={Clock}
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button size="sm" variant="primary">
          <Plus className="mr-1 h-3.5 w-3.5" />
          Add Package
        </Button>
        <Button size="sm" variant="outline">
          <BarChart3 className="mr-1 h-3.5 w-3.5" />
          View Reports
        </Button>
        <Button size="sm" variant="outline">
          <Send className="mr-1 h-3.5 w-3.5" />
          Send Newsletter
        </Button>
      </div>

      {/* Tables Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5" hoverLift={false}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              Recent Bookings
            </h3>
            <button className="text-xs font-medium text-primary hover:text-forest">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-2 font-medium">ID</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0">
                    <td className="py-2 font-mono text-xs text-muted-foreground">
                      {b.id}
                    </td>
                    <td className="py-2 text-foreground">{b.customerName}</td>
                    <td className="py-2 font-medium text-foreground">
                      {formatINR(b.totalAmount)}
                    </td>
                    <td className="py-2">
                      <Badge
                        variant={
                          b.status === "confirmed"
                            ? "primary"
                            : b.status === "pending"
                            ? "accent"
                            : b.status === "cancelled"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {b.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {recentBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-sm text-muted-foreground"
                    >
                      No bookings yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5" hoverLift={false}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              Recent Users
            </h3>
            <button className="text-xs font-medium text-primary hover:text-forest">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border last:border-0">
                    <td className="py-2 text-foreground">{u.name}</td>
                    <td className="py-2">
                      <Badge variant="primary">{u.role}</Badge>
                    </td>
                    <td className="py-2 text-muted-foreground">
                      {formatDate(u.createdAt)}
                    </td>
                  </tr>
                ))}
                {recentUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-6 text-center text-sm text-muted-foreground"
                    >
                      No users yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="p-5" hoverLift={false}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
          <div className="mt-1 flex items-center gap-1 text-xs">
            {positive ? (
              <TrendingUp className="h-3 w-3 text-success" />
            ) : (
              <TrendingDown className="h-3 w-3 text-danger" />
            )}
            <span className={positive ? "text-success" : "text-danger"}>
              {change}
            </span>
          </div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}

/* ========================== Users Tab ========================== */
function UsersTab({ allUsers }: { allUsers: User[] }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "traveler" | "provider">("all");

  const filtered = useMemo(() => {
    let list = [...allUsers];
    if (roleFilter !== "all") {
      list = list.filter((u) => {
        if (roleFilter === "provider") return ["homestay_owner", "guide", "taxi_owner"].includes(u.role);
        return u.role === roleFilter;
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allUsers, roleFilter, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Users</h2>
          <p className="text-sm text-muted-foreground">
            Manage registered users and providers
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
            className="appearance-none rounded-lg border border-border bg-card py-2.5 pl-9 pr-8 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="traveler">Traveler</option>
            <option value="provider">Provider</option>
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden" hoverLift={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant="primary">{u.role}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">Active</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(u.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ========================== Bookings Tab ========================== */
function BookingsTabAdmin({ bookings }: { bookings: Booking[] }) {
  const [statusFilter, setStatusFilter] = useState<"all" | Booking["status"]>("all");
  const [sort, setSort] = useState<"date" | "amount">("date");

  const filtered = useMemo(() => {
    let list = [...bookings];
    if (statusFilter !== "all") {
      list = list.filter((b) => b.status === statusFilter);
    }
    list.sort((a, b) => {
      if (sort === "amount") return b.totalAmount - a.totalAmount;
      return new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime();
    });
    return list;
  }, [bookings, statusFilter, sort]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Bookings</h2>
        <p className="text-sm text-muted-foreground">
          Manage all customer bookings
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="appearance-none rounded-lg border border-border bg-card py-2.5 pl-3 pr-8 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="appearance-none rounded-lg border border-border bg-card py-2.5 pl-3 pr-8 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      <Card className="overflow-hidden" hoverLift={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Booking ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {b.id}
                  </td>
                  <td className="px-4 py-3 text-foreground">{b.customerName}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {b.items.length} item(s)
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {formatINR(b.totalAmount)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        b.status === "confirmed"
                          ? "primary"
                          : b.status === "pending"
                          ? "accent"
                          : b.status === "cancelled"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(b.bookingDate)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <XCircle className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ========================== Analytics Tab ========================== */
function AnalyticsTab() {
  const revenueByMonth = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 62 },
    { month: "Mar", value: 38 },
    { month: "Apr", value: 78 },
    { month: "May", value: 55 },
    { month: "Jun", value: 92 },
  ];

  const bookingsByDestination = [
    { name: "Pelling", value: 85 },
    { name: "Kalimpong", value: 72 },
    { name: "Darjeeling", value: 65 },
    { name: "Mirik", value: 48 },
    { name: "Lamahatta", value: 40 },
  ];

  const userGrowth = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 42 },
    { month: "Apr", value: 58 },
    { month: "May", value: 74 },
    { month: "Jun", value: 96 },
  ];

  const revenueByCategory = [
    { name: "Packages", value: 55, color: "bg-primary" },
    { name: "Hotels", value: 30, color: "bg-secondary" },
    { name: "Activities", value: 15, color: "bg-accent" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Platform performance and insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue by Month */}
        <Card className="p-5" hoverLift={false}>
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Revenue by Month (₹K)
          </h3>
          <div className="flex items-end gap-3 h-48">
            {revenueByMonth.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-md bg-primary/80 transition-all hover:bg-primary"
                  style={{ height: `${item.value}%` }}
                />
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Bookings by Destination */}
        <Card className="p-5" hoverLift={false}>
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Bookings by Destination
          </h3>
          <div className="space-y-3">
            {bookingsByDestination.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-secondary transition-all"
                    style={{ width: `${(item.value / 100) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* User Growth */}
        <Card className="p-5" hoverLift={false}>
          <h3 className="mb-4 text-base font-semibold text-foreground">
            User Growth
          </h3>
          <div className="flex items-end gap-2 h-48">
            {userGrowth.map((item, i) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-md bg-accent/80 transition-all hover:bg-accent"
                  style={{ height: `${item.value}%` }}
                />
                {i % 2 === 0 && (
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue by Category */}
        <Card className="p-5" hoverLift={false}>
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Revenue by Category
          </h3>
          <div className="space-y-4">
            {revenueByCategory.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${item.color}`} />
                <span className="flex-1 text-sm text-foreground">{item.name}</span>
                <span className="text-sm font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-4 overflow-hidden rounded-full">
            {revenueByCategory.map((item) => (
              <div
                key={item.name}
                className={`${item.color} h-full`}
                style={{ width: `${item.value}%` }}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ========================== Providers Tab ========================== */
function ProvidersTab({ allUsers }: { allUsers: User[] }) {
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "verified" | "rejected">("all");

  const providers = allUsers.filter((u) =>
    ["homestay_owner", "guide", "taxi_owner"].includes(u.role)
  );

  const filtered = useMemo(() => {
    if (statusFilter === "all") return providers;
    return providers.filter((p) => p.verificationStatus === statusFilter);
  }, [providers, statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Providers</h2>
        <p className="text-sm text-muted-foreground">
          Review and manage provider registrations
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {(["all", "pending", "verified", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s[0].toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden" hoverLift={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Business Name</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Documents</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {p.businessName || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{p.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-foreground">{p.name}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        p.verificationStatus === "verified"
                          ? "primary"
                          : p.verificationStatus === "pending"
                          ? "accent"
                          : "outline"
                      }
                    >
                      {p.verificationStatus || "pending"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {p.documents?.length || 0} doc(s)
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs font-medium text-success transition-colors hover:bg-success/10">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve
                      </button>
                      <button className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs font-medium text-danger transition-colors hover:bg-danger/10">
                        <XCircle className="h-3.5 w-3.5" />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No providers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ========================== Content Tab ========================== */
function ContentTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Content Management</h2>
        <p className="text-sm text-muted-foreground">
          Manage destinations, packages, and blog posts
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5" hoverLift={false}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Map className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Destinations</p>
            </div>
          </div>
        </Card>
        <Card className="p-5" hoverLift={false}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <PackageOpen className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Packages</p>
            </div>
          </div>
        </Card>
        <Card className="p-5" hoverLift={false}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-xs text-muted-foreground">Blog Posts</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 text-center" hoverLift={false}>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          CMS Features Coming Soon
        </h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          A full content management system for destinations, packages, and blog
          posts is under development.
        </p>
      </Card>
    </div>
  );
}

/* ========================== Settings Tab ========================== */
function AdminSettingsTab() {
  const [siteName, setSiteName] = useState("KuboVista");
  const [slogan, setSlogan] = useState("Travel For Premium Memories");
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure platform-wide settings
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        <Card className="p-5" hoverLift={false}>
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Site Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Slogan
              </label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </Card>

        <Card className="p-5" hoverLift={false}>
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Email Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                From Email
              </label>
              <input
                type="email"
                defaultValue="noreply@kubovista.travel"
                className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                SMTP Host
              </label>
              <input
                type="text"
                defaultValue="smtp.kubovista.travel"
                className="w-full rounded-lg border border-border bg-card py-2 px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </Card>

        <Card className="p-5" hoverLift={false}>
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Payment Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Currency
              </label>
              <input
                type="text"
                defaultValue="INR"
                readOnly
                className="w-full rounded-lg border border-border bg-muted py-2 px-3 text-sm text-muted-foreground outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Default Payment Gateway
              </label>
              <input
                type="text"
                defaultValue="Razorpay"
                readOnly
                className="w-full rounded-lg border border-border bg-muted py-2 px-3 text-sm text-muted-foreground outline-none cursor-not-allowed"
              />
            </div>
          </div>
        </Card>

        <Card className="p-5" hoverLift={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Maintenance Mode
              </p>
              <p className="text-xs text-muted-foreground">
                Temporarily disable public access
              </p>
            </div>
            <button
              onClick={() => setMaintenance((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                maintenance ? "bg-primary" : "bg-muted"
              }`}
              aria-label="Toggle maintenance mode"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  maintenance ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
