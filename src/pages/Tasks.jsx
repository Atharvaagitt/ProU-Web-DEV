import React, { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, User } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils';

const Tasks = () => {
    const { tasks, updateTaskStatus, employees, addTask } = useTaskContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        assigneeId: '',
        dueDate: '',
        status: 'Pending'
    });

    const columns = {
        'Pending': { title: 'Pending', color: 'bg-yellow-500/10 text-yellow-500' },
        'In Progress': { title: 'In Progress', color: 'bg-blue-500/10 text-blue-500' },
        'Completed': { title: 'Completed', color: 'bg-green-500/10 text-green-500' }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { draggableId, destination } = result;
        if (destination.droppableId !== result.source.droppableId) {
            updateTaskStatus(draggableId, destination.droppableId);
        }
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.title || !newTask.assigneeId) return;
        addTask(newTask);
        setIsModalOpen(false);
        setNewTask({ title: '', description: '', assigneeId: '', dueDate: '', status: 'Pending' });
    };

    const getAssignee = (id) => employees.find(e => e.id === id);

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Task</DialogTitle>
                            <DialogDescription>
                                Create a new task and assign it to a team member.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddTask} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <label htmlFor="title" className="text-sm font-medium">Title</label>
                                <Input
                                    id="title"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    placeholder="Task title"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="desc" className="text-sm font-medium">Description</label>
                                <Input
                                    id="desc"
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    placeholder="Task description"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="assignee" className="text-sm font-medium">Assignee</label>
                                <select
                                    id="assignee"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={newTask.assigneeId}
                                    onChange={(e) => setNewTask({ ...newTask, assigneeId: e.target.value })}
                                >
                                    <option value="">Select Assignee</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="date" className="text-sm font-medium">Due Date</label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Task</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                    {Object.entries(columns).map(([columnId, column]) => (
                        <div key={columnId} className="flex flex-col h-full bg-muted/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg">{column.title}</h3>
                                <Badge variant="outline" className="bg-background">
                                    {tasks.filter(t => t.status === columnId).length}
                                </Badge>
                            </div>

                            <Droppable droppableId={columnId}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="flex-1 space-y-4"
                                    >
                                        {tasks
                                            .filter(task => task.status === columnId)
                                            .map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <Card
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                                                        >
                                                            <CardContent className="p-4 space-y-3">
                                                                <div className="flex justify-between items-start">
                                                                    <p className="font-medium leading-none">{task.title}</p>
                                                                    {task.reward && (
                                                                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full animate-in zoom-in duration-300">
                                                                            <span className="text-lg">🏆</span>
                                                                            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">+{task.points}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                                    {task.description}
                                                                </p>
                                                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                                                                    <div className="flex items-center gap-1">
                                                                        <User className="h-3 w-3" />
                                                                        {getAssignee(task.assigneeId)?.name || 'Unassigned'}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar className="h-3 w-3" />
                                                                        {task.dueDate}
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Tasks;
