import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CheckSquare, LogOut, Settings, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTaskContext } from '@/context/TaskContext';

const Sidebar = ({ className }) => {
    const { totalPoints } = useTaskContext();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Employees', path: '/employees' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className={cn("flex flex-col h-screen w-64 bg-muted/40 border-r border-border transition-all duration-300", className)}>
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                    <CheckSquare className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">TaskTracker</h1>
            </div>

            <div className="px-6 pb-6">
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-full">
                        <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">Total Points</p>
                        <p className="text-xl font-bold text-foreground">{totalPoints}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] border-l-4 border-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:pl-5"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive && "text-primary scale-110")} />
                                <span className="relative z-10">{item.label}</span>
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors group">
                    <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
