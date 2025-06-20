document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const topicsListEl = document.getElementById('topics-list');
    const questionsContainerEl = document.getElementById('questions-container');
    const currentTopicTitleEl = document.getElementById('current-topic-title');
    const topicBadgeEl = document.getElementById('topic-badge');
    const paginationControlsEl = document.getElementById('pagination-controls');
    const paginationPagesEl = document.getElementById('pagination-pages');
    const paginationInfoEl = document.getElementById('pagination-info');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const loadingIndicator = document.getElementById('loading-indicator');

    // App State
    let topicsData = [];
    let currentTopic = '';
    let currentTopicData = null;
    let currentTopicQuestions = [];
    let filteredQuestions = [];
    let currentPage = 1;
    let pageSize = 10;
    let searchQuery = '';
    let cachedTopicData = {}; // Cache for topic data to avoid repeated fetches
    let totalQuestions = 0; // Total questions for the current topic

    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Light Mode';
    }

    // Check for saved page size preference
    const savedPageSize = localStorage.getItem('pageSize');
    if (savedPageSize) {
        pageSize = parseInt(savedPageSize);
    }

    // Set up theme toggle
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // Update icon and text
        themeIcon.textContent = isDark ? '🌙' : '☀️';
        themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Set up page size options
    document.querySelectorAll('.page-size-option').forEach(option => {
        option.addEventListener('click', function() {
            pageSize = parseInt(this.dataset.size);
            localStorage.setItem('pageSize', pageSize);
            if (currentTopic) {
                currentPage = 1; // Reset to first page
                loadTopicPage(currentTopic, currentPage, pageSize);
            }
        });
    });

    // Set up search functionality
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    clearSearchBtn.addEventListener('click', clearSearch);

    function performSearch() {
        searchQuery = searchInput.value.trim().toLowerCase();
        
        if (searchQuery === '') return;
        
        if (currentTopicQuestions.length > 0) {
            // Filter questions based on search query
            filteredQuestions = currentTopicQuestions.filter(question => 
                question.question.toLowerCase().includes(searchQuery) || 
                question.answer.toLowerCase().includes(searchQuery)
            );
            
            currentPage = 1;
            displayQuestionsForCurrentPage();
            updatePaginationControls();
        }
    }

    function clearSearch() {
        searchInput.value = '';
        searchQuery = '';
        
        if (currentTopicQuestions.length > 0) {
            filteredQuestions = [...currentTopicQuestions];
            currentPage = 1;
            displayQuestionsForCurrentPage();
            updatePaginationControls();
        }
    }

    // Initialize the application
    loadQuestions();

    async function loadQuestions() {
        try {
            // Fetch topics from the new topics.json file
            const response = await fetch('./data/topics.json');
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            topicsData = data.topics;
            
            // Populate topics list
            populateTopicsList();
            
            // If there are topics, load the first one
            if (topicsData.length > 0) {
                loadTopic(topicsData[0].id);
            }
        } catch (error) {
            console.error('Failed to load topics:', error);
            questionsContainerEl.innerHTML = `
                <div class="alert alert-danger">
                    <h4 class="alert-heading">Error Loading Data</h4>
                    <p>Could not load the topics.json file. Please ensure it exists and is accessible.</p>
                    <hr>
                    <p class="mb-0">Technical details: ${error.message}</p>
                </div>
            `;
        }
    }

    function populateTopicsList() {
        topicsListEl.innerHTML = '';
        
        topicsData.forEach(topic => {
            const difficultyClass = `badge-${topic.difficulty.toLowerCase()}`;
            
            const topicEl = document.createElement('a');
            topicEl.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
            topicEl.dataset.topicId = topic.id;
            
            topicEl.innerHTML = `
                ${topic.name}
                <span class="badge rounded-pill ${difficultyClass}">${topic.difficulty}</span>
            `;
            
            topicEl.addEventListener('click', () => loadTopic(topic.id));
            topicsListEl.appendChild(topicEl);
        });
    }

    async function loadTopic(topicId) {
        // Set active class on selected topic
        document.querySelectorAll('#topics-list .list-group-item').forEach(item => {
            item.classList.toggle('active', item.dataset.topicId === topicId);
        });

        // Find the topic data from our topics list
        const topic = topicsData.find(t => t.id === topicId);
        if (!topic) return;

        currentTopic = topic.id;
        currentTopicTitleEl.textContent = topic.name;

        // Set topic badge
        const difficultyClass = `badge-${topic.difficulty.toLowerCase()}`;
        topicBadgeEl.className = `badge rounded-pill ${difficultyClass}`;
        topicBadgeEl.textContent = topic.difficulty;

        // Reset search and pagination
        searchQuery = '';
        searchInput.value = '';
        currentPage = 1;

        // Show loading indicator
        loadingIndicator.classList.remove('d-none');
        questionsContainerEl.innerHTML = '';

        try {
            // Fetch all question parts for the selected topic
            const questionPromises = topic.dataFiles.map(file => fetch(`./data/${file}`).then(res => res.json()));
            const questionParts = await Promise.all(questionPromises);
            
            // Combine questions from all parts
            currentTopicQuestions = questionParts.flat();
            filteredQuestions = [...currentTopicQuestions];
            totalQuestions = currentTopicQuestions.length;

            // Display questions and update pagination
            displayQuestionsForCurrentPage();
            updatePaginationControls();

        } catch (error) {
            console.error('Failed to load topic questions:', error);
            questionsContainerEl.innerHTML = `
                <div class="alert alert-danger">
                    <h4 class="alert-heading">Error!</h4>
                    <p>Failed to load questions for this topic. Please check the console for details.</p>
                </div>
            `;
        } finally {
            // Hide loading indicator
            loadingIndicator.classList.add('d-none');
        }
    }

    function displayQuestionsForCurrentPage() {
        questionsContainerEl.innerHTML = '';

        if (filteredQuestions.length === 0) {
            questionsContainerEl.innerHTML = `
                <div class="alert alert-info">
                    <p class="mb-0">No questions found${searchQuery ? ' for your search query' : ''}.</p>
                </div>
            `;
            updatePaginationControls();
            return;
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, filteredQuestions.length);
        const questionsToDisplay = filteredQuestions.slice(startIndex, endIndex);

        questionsToDisplay.forEach((question, index) => {
            const questionNumber = startIndex + index + 1;
            const questionEl = createQuestionElement(question, questionNumber);
            questionsContainerEl.appendChild(questionEl);
        });

        // Update pagination info
        paginationInfoEl.textContent = `Showing ${startIndex + 1}-${endIndex} of ${filteredQuestions.length} questions`;
        
        // Set up toggle buttons for answers
        document.querySelectorAll('.toggle-answer').forEach(btn => {
            const answerId = btn.dataset.answerId;
            const answerEl = document.getElementById(answerId);
            
            btn.addEventListener('click', () => {
                if (answerEl.classList.contains('hidden')) {
                    answerEl.classList.remove('hidden');
                    btn.textContent = 'Hide Answer';
                    btn.classList.replace('btn-outline-primary', 'btn-outline-secondary');
                } else {
                    answerEl.classList.add('hidden');
                    btn.textContent = 'Show Answer';
                    btn.classList.replace('btn-outline-secondary', 'btn-outline-primary');
                }
            });
        });
    }

    function createQuestionElement(question, questionNumber) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question fade-in';
        
        // Determine badge color based on difficulty
        let badgeClass = 'badge-easy';
        if (question.difficulty === 'Medium') {
            badgeClass = 'badge-medium';
        } else if (question.difficulty === 'Hard') {
            badgeClass = 'badge-hard';
        }
        
        const answerId = `answer-${question.id}`;
        const buttonId = `btn-${question.id}`;
        
        questionDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                    <h4 class="mb-1">${questionNumber}. ${question.question}</h4>
                </div>
                <span class="badge ${badgeClass} ms-2">${question.difficulty}</span>
            </div>
            <div class="answer-container">
                <button id="${buttonId}" class="btn btn-outline-primary toggle-answer" data-answer-id="${answerId}">Show Answer</button>
                <div id="${answerId}" class="answer hidden">
                    <p>${question.answer}</p>
                </div>
            </div>
        `;
        
        return questionDiv;
    }

    function updatePaginationControls() {
        if (filteredQuestions.length === 0) {
            document.getElementById('pagination-card').style.display = 'none';
            return;
        }

        document.getElementById('pagination-card').style.display = 'block';

        const totalPages = Math.ceil(filteredQuestions.length / pageSize);
        
        // Update pagination pages
        generatePaginationButtons(totalPages);
        
        // Update prev/next buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    function generatePaginationButtons(totalPages) {
        paginationPagesEl.innerHTML = '';
        
        // Logic to show a reasonable number of page buttons
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        // First page
        if (startPage > 1) {
            addPageButton(1);
            if (startPage > 2) {
                addEllipsis();
            }
        }
        
        // Page buttons
        for (let i = startPage; i <= endPage; i++) {
            addPageButton(i);
        }
        
        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                addEllipsis();
            }
            addPageButton(totalPages);
        }
    }

    function addPageButton(pageNum) {
        const pageBtn = document.createElement('div');
        pageBtn.className = `pagination-page${pageNum === currentPage ? ' active' : ''}`;
        pageBtn.textContent = pageNum;
        pageBtn.addEventListener('click', () => {
            if (pageNum !== currentPage) {
                currentPage = pageNum;
                displayQuestionsForCurrentPage();
                updatePaginationControls();
            }
        });
        paginationPagesEl.appendChild(pageBtn);
    }

    function addEllipsis() {
        const ellipsis = document.createElement('div');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        paginationPagesEl.appendChild(ellipsis);
    }

    // Set up pagination buttons
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayQuestionsForCurrentPage();
            updatePaginationControls();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredQuestions.length / pageSize);
        if (currentPage < totalPages) {
            currentPage++;
            displayQuestionsForCurrentPage();
            updatePaginationControls();
        }
    });

    // Error handling for fetch operations
    window.addEventListener('error', (event) => {
        console.error('Global error caught:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
    });
});
