"use client"

import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { Thermometer, Droplets } from "lucide-react"

const SensorCharts = ({ temperature, humidity }) => {
  const tempChartRef = useRef(null)
  const humChartRef = useRef(null)
  const tempChartInstance = useRef(null)
  const humChartInstance = useRef(null)
  const [timeSeries, setTimeSeries] = useState([])
  const [tempData, setTempData] = useState([])
  const [humData, setHumData] = useState([])

  // Update data when new readings come in
  useEffect(() => {
    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    setTimeSeries(prev => [...prev.slice(-14), timeString]) // Keep last 15 data points
    setTempData(prev => [...prev.slice(-14), temperature])
    setHumData(prev => [...prev.slice(-14), humidity])
  }, [temperature, humidity])

  useEffect(() => {
    // Destroy previous charts if they exist
    if (tempChartInstance.current) {
      tempChartInstance.current.destroy()
    }
    if (humChartInstance.current) {
      humChartInstance.current.destroy()
    }

    // Set chart.js defaults
    Chart.defaults.color = document.documentElement.classList.contains("dark") ? "#e5e7eb" : "#374151"
    Chart.defaults.borderColor = document.documentElement.classList.contains("dark")
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"

    // Only create charts if we have data
    if (tempChartRef.current && humChartRef.current && timeSeries.length > 0) {
      // Temperature Chart
      tempChartInstance.current = new Chart(tempChartRef.current, {
        type: "line",
        data: {
          labels: timeSeries,
          datasets: [
            {
              label: "Temperature (°C)",
              data: tempData,
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              borderColor: "rgba(239, 68, 68, 1)",
              borderWidth: 2,
              tension: 0.1,
              pointBackgroundColor: "rgba(239, 68, 68, 1)",
              pointBorderColor: "#fff",
              pointRadius: 3,
              pointHoverRadius: 5,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: 10,
              titleFont: {
                size: 14,
                weight: "bold",
              },
              bodyFont: {
                size: 13,
              },
              displayColors: false,
              callbacks: {
                title: (context) => `Time: ${context[0].label}`,
                label: (context) => `${context.dataset.label}: ${context.raw}°C`
              }
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                padding: 10,
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 6
              }
            },
          },
          animation: {
            duration: 0
          }
        },
      })

      // Humidity Chart
      humChartInstance.current = new Chart(humChartRef.current, {
        type: "line",
        data: {
          labels: timeSeries,
          datasets: [
            {
              label: "Humidity (%)",
              data: humData,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 2,
              tension: 0.1,
              pointBackgroundColor: "rgba(59, 130, 246, 1)",
              pointBorderColor: "#fff",
              pointRadius: 3,
              pointHoverRadius: 5,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: 10,
              titleFont: {
                size: 14,
                weight: "bold",
              },
              bodyFont: {
                size: 13,
              },
              displayColors: false,
              callbacks: {
                title: (context) => `Time: ${context[0].label}`,
                label: (context) => `${context.dataset.label}: ${context.raw}%`
              }
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                padding: 10,
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 6
              }
            },
          },
          animation: {
            duration: 500
          }
        },
      })
    }

    // Cleanup function
    return () => {
      if (tempChartInstance.current) {
        tempChartInstance.current.destroy()
      }
      if (humChartInstance.current) {
        humChartInstance.current.destroy()
      }
    }
  }, [timeSeries, tempData, humData])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Sensor Readings</h2>
      </div>
      <div className="p-4 space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-md text-red-600 dark:text-red-400">
                <Thermometer className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Temperature</h3>
            </div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{temperature.toFixed(1)}°C</div>
          </div>
          <div className="h-[150px]">
            <canvas ref={tempChartRef} />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-md text-blue-600 dark:text-blue-400">
                <Droplets className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Humidity</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{humidity.toFixed(1)}%</div>
          </div>
          <div className="h-[150px]">
            <canvas ref={humChartRef} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SensorCharts