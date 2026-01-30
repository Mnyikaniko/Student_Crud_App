package com.example.studentcrudapp.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.studentcrudapp.data.entity.Student
import com.example.studentcrudapp.viewmodel.StudentViewModel

@Composable
fun StudentListScreen(viewModel: StudentViewModel) {
    val students by viewModel.students.collectAsState()

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        LazyColumn {
            items(students) { student ->
                Text("${student.name} - ${student.course}")
            }
        }
        Spacer(modifier = Modifier.height(16.dp))
        var name by remember { mutableStateOf("") }
        var course by remember { mutableStateOf("") }
        TextField(value = name, onValueChange = { name = it }, label = { Text("Name") })
        TextField(value = course, onValueChange = { course = it }, label = { Text("Course") })
        Button(onClick = {
            viewModel.addStudent(Student(name = name, course = course))
            name = ""
            course = ""
        }) {
            Text("Add Student")
        }
    }
}