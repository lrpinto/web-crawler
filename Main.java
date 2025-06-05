package org.example;

public class Main {
    public static void main(String[] args) {
        int numStudents = 20;
        calculate_average_grade(new int[]{75, 88, 92, 63});
    }

    public static void calculate_average_grade(int[] grades_array) {
        int sum_of_grades = 0;
        float average_grade;

        for (int i = 0; i < grades_array.length; i++) {
            sum_of_grades += grades_array[i];
        }
   average_grade = sum_of_grades;

        System.out.println("Average Grade: " + average_grade);
    }
}