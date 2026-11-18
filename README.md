# Smart Campus Analytics Dashboard

A React-based student analytics dashboard that helps monitor academic
performance, attendance, and student progress through interactive charts
and student records.

## Features

-   **Dashboard Overview** -- Displays total students, average
    attendance, average marks, and at-risk student count.
-   **Data Visualizations** -- Bar, pie, and line charts for exploring
    student performance.
-   **Student Records** -- View student information in a structured
    table.
-   **Search and Filters** -- Search students and filter records by
    class or status, with sorting options.
-   **Student Details** -- View individual attendance, average marks,
    assignment completion, and subject-wise performance.
-   **At-Risk Monitoring** -- Identifies students with attendance below
    75% or average marks below 40%.
-   **At-Risk Preview** -- Highlights students who may require academic
    attention.
-   **Performance Leaderboard** -- Shows the top five students based on
    average marks.
-   **Responsive Design** -- Includes layouts for desktop and mobile
    screens.

## Technologies Used

-   React
-   Vite
-   JavaScript
-   React Router
-   Recharts
-   Lucide React
-   CSS
-   JSON

## Project Structure

``` text
src/
├── components/
│   ├── AnalyticsCharts.jsx
│   ├── AtRiskPreview.jsx
│   ├── Leaderboard.jsx
│   └── StatCard.jsx
├── data/
│   └── students.json
├── layouts/
│   └── DashboardLayout.jsx
├── pages/
│   ├── Overview.jsx
│   └── StudentRecords.jsx
├── utils/
│   └── dashboardStats.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

CSS files for the corresponding components, pages, and layout are also
included in their respective folders.

## Getting Started

### Prerequisites

-   Node.js and npm
-   Git (optional, for cloning the repository)

### Installation

1.  Clone the repository:

    ``` bash
    git clone <repository-url>
    ```

2.  Move into the project directory:

    ``` bash
    cd smart-campus-analytics
    ```

3.  Install the dependencies:

    ``` bash
    npm install
    ```

4.  Start the development server:

    ``` bash
    npm run dev
    ```

5.  Open the local URL shown in the terminal.

## Production Build

To create a production build, run:

``` bash
npm run build
```

The generated production files are placed in the `dist` folder.

## Dataset and At-Risk Criteria

The dashboard uses a sample JSON dataset containing 25 fictional student
records. Each record includes student details, class, attendance,
subject-wise marks, and assignment completion information.

A student is classified as **At Risk** if either of the following
conditions is met:

-   Attendance is below 75%, or
-   Average marks are below 40%.

The dashboard statistics and student status are derived from the
dataset.

## Notes

-   This is a frontend-only academic project.
-   Student information is sample data for demonstration purposes.
-   No backend server or database is required.

## Author

Created as part of a Web Technology practical project.
