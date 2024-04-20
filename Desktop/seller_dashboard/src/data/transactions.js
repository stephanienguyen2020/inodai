
import moment from "moment-timezone";

export default [
    {
        "invoiceNumber": 300500,
        "status": "Paid",
        "subscription": "Genomic Data Analysis",
        "price": "20,00",
        "issueDate": moment().subtract(1, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(1, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300499,
        "status": "Paid",
        "subscription": "Autonomous Vehicles Telemetry",
        "price": "35,00",
        "issueDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(2, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300498,
        "status": "Paid",
        "subscription": "Social Media Trends Research",
        "price": "25,00",
        "issueDate": moment().subtract(2, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(2, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300497,
        "status": "Paid",
        "subscription": "E-commerce Consumer Behavior",
        "price": "50,00",
        "issueDate": moment().subtract(3, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(3, "days").add(1, "month").format("DD MMM YYYY")
    },
    {
        "invoiceNumber": 300496,
        "status": "Due",
        "subscription": "Online Education Effectiveness",
        "price": "50,00",
        "issueDate": moment().subtract(1, "day").subtract(1, "month").format("DD MMM YYYY"),
        "dueDate": moment().subtract(1, "day").format("DD MMM YYYY")
    }
]