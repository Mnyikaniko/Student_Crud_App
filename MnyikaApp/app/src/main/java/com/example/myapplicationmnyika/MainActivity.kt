package com.example.studentcrudapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.studentcrudapp.data.database.AppDatabase
import com.example.studentcrudapp.data.repository.StudentRepository
import com.example.studentcrudapp.ui.screens.StudentListScreen
import com.example.studentcrudapp.viewmodel.StudentViewModel
import com.example.studentcrudapp.viewmodel.StudentViewModelFactory

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val dao = AppDatabase.getDatabase(this).studentDao()
        val repository = StudentRepository(dao)
        val factory = StudentViewModelFactory(repository)

        setContent {
            val studentViewModel: StudentViewModel = viewModel(factory = factory)
            StudentListScreen(studentViewModel)
        }
    }
}