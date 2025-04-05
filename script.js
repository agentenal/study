document.addEventListener('DOMContentLoaded', () => {
    // --- IMPORTANT: DEFINE YOUR MARKMAP DATA HERE ---
    const markmapData = [
        // --- USER: Replace file paths with your actual file locations! ---
        // --- Suggestion: Create a 'maps' folder next to index.html ---
        {
            grade: '7',
            semester: '下册',
            publisher: '人教版',
            subject: '语文',
            fileName: 'maps/7下_人教版_语文.html' // Example path
        },
        {
            grade: '7',
            semester: '下册',
            publisher: '人教版',
            subject: '英语', // Remember this is the specific version you requested
            fileName: 'maps/7下_人教版_英语_指定版.html' // Example path - name it appropriately
        },
        {
            grade: '7',
            semester: '下册',
            publisher: '人教版', // Assuming Renjiao for Math, adjust if needed
            subject: '数学',
            fileName: 'maps/7下_人教版_数学.html' // Example path - MAKE SURE THIS FILE EXISTS
        },
        {
            grade: '7',
            semester: '下册',
            publisher: '湘教版',
            subject: '地理',
            fileName: 'maps/7下_湘教版_地理.html' // Example path
        },
        // --- Add more entries here if you have other markmaps ---
        // Example:
        // {
        //     grade: '8',
        //     semester: '上册',
        //     publisher: '北师大版',
        //     subject: '物理',
        //     fileName: 'maps/8上_北师大版_物理.html'
        // },
    ];
    // --- END OF DATA DEFINITION ---

    const gradeSelect = document.getElementById('gradeSelect');
    const semesterSelect = document.getElementById('semesterSelect');
    const publisherSelect = document.getElementById('publisherSelect');
    const subjectSelect = document.getElementById('subjectSelect');
    const resultArea = document.getElementById('resultArea');

    // Function to populate a select dropdown with unique options
    function populateSelect(selectElement, data, key) {
        const uniqueValues = [...new Set(data.map(item => item[key]))].sort(); // Get unique sorted values
        uniqueValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectElement.appendChild(option);
        });
    }

    // Populate all dropdowns on page load
    populateSelect(gradeSelect, markmapData, 'grade');
    populateSelect(semesterSelect, markmapData, 'semester');
    populateSelect(publisherSelect, markmapData, 'publisher');
    populateSelect(subjectSelect, markmapData, 'subject');

    // Function to find the corresponding map and update the result area
    function findAndDisplayMap() {
        const selectedGrade = gradeSelect.value;
        const selectedSemester = semesterSelect.value;
        const selectedPublisher = publisherSelect.value;
        const selectedSubject = subjectSelect.value;

        // Clear previous result
        resultArea.innerHTML = ''; // Clear content

        // Check if all options are selected
        if (selectedGrade && selectedSemester && selectedPublisher && selectedSubject) {
            const foundMap = markmapData.find(item =>
                item.grade === selectedGrade &&
                item.semester === selectedSemester &&
                item.publisher === selectedPublisher &&
                item.subject === selectedSubject
            );

            if (foundMap) {
                const link = document.createElement('a');
                link.href = foundMap.fileName;
                link.textContent = `打开 ${foundMap.grade}年级 ${foundMap.semester} ${foundMap.publisher} ${foundMap.subject} 思维导图`;
                link.target = '_blank'; // Open in new tab
                resultArea.appendChild(link);
            } else {
                const message = document.createElement('p');
                message.textContent = '未找到匹配的思维导图文件。请检查您的选择或数据。';
                resultArea.appendChild(message);
            }
        } else {
            // If not all options are selected, show the initial prompt
             const message = document.createElement('p');
             message.textContent = '请完成所有选择以查找对应的思维导图。';
             resultArea.appendChild(message);
        }
    }

    // Add event listeners to all select elements
    gradeSelect.addEventListener('change', findAndDisplayMap);
    semesterSelect.addEventListener('change', findAndDisplayMap);
    publisherSelect.addEventListener('change', findAndDisplayMap);
    subjectSelect.addEventListener('change', findAndDisplayMap);

    // Initial call to set the default message (optional, already in HTML)
    // findAndDisplayMap();
});
