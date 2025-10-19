package com.kaiburr.task1.controller;

import com.kaiburr.task1.model.Task;
import com.kaiburr.task1.model.TaskExecution;
import com.kaiburr.task1.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.Instant;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // ✅ Get all tasks or one by ID
    @GetMapping
    public ResponseEntity<?> getTasks(@RequestParam(required = false) String id) {
        if (id != null) {
            Optional<Task> task = taskRepository.findById(id);
            return task.<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found"));
        }
        return ResponseEntity.ok(taskRepository.findAll());
    }

    // ✅ Create or update a task
    @PutMapping
    public ResponseEntity<?> createOrUpdateTask(@RequestBody Task task) {
        if (task.getCommand() == null || task.getCommand().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Command cannot be empty");
        }
        Task saved = taskRepository.save(task);
        return ResponseEntity.ok(saved);
    }

    // ✅ Delete a task by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable String id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return ResponseEntity.ok("Deleted task with id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }
    }

    // ✅ Search tasks by name
    @GetMapping("/search")
    public ResponseEntity<?> searchByName(@RequestParam String name) {
        List<Task> tasks = taskRepository.findByNameContainingIgnoreCase(name);
        if (tasks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No matching tasks found");
        }
        return ResponseEntity.ok(tasks);
    }

    // ✅ Execute a command (called by frontend's /tasks/{id}/execute)
    @PutMapping("/{id}/execute")
    public ResponseEntity<?> executeCommand(@PathVariable String id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Task not found"));
        }

        Task task = optionalTask.get();
        String command = task.getCommand();
        String output = "";
        Instant start = Instant.now();
        Instant end;

        try {
            // Security validation
            if (command.contains(";") || command.contains("&") || command.contains("|")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Unsafe command detected!"));
            }

            // Run the command locally (for demo)
            Process process = new ProcessBuilder("cmd.exe", "/c", command).start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }
            process.waitFor();

            output = result.toString();
            end = Instant.now();

            // Create a new execution record
            TaskExecution exec = new TaskExecution(start, end, output);
            task.getTaskExecutions().add(exec);
            taskRepository.save(task);

            // ✅ Frontend expects { "output": "..." }
            return ResponseEntity.ok(Map.of("output", output.trim()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error executing command: " + e.getMessage()));
        }
    }
}
