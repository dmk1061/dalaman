while ($true) {
    $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    try {
        $weather = (Invoke-RestMethod -Uri "https://wttr.in/Dalaman?format=3" -Headers @{"User-Agent"="curl/7.68.0"} -ErrorAction Stop).Trim()
    } catch {
        $weather = "Не удалось получить данные о погоде"
    }
    $output = "- **Время:** $time | **Погода:** $weather"
    Add-Content -Path "c:\Users\Dimok\IdeaProjects\dalaman\monitoring_test.md" -Value $output -Encoding UTF8
    Start-Sleep -Seconds 600
}
