"use client";
import React, { useEffect } from 'react';

const ContactPage = () => {
  useEffect(() => {
    // All the javascript from the original page.html will go here.
    // This ensures it runs on the client after the component has mounted.

    const subjects = [
        {
            "name": "Accounts",
            "chapters": [
                "Introduction to Accounting",
                "Theory Base of Accounting",
                "Recording of Transactions - I",
                "Recording of Transactions - II",
                "Bank Reconciliation Statement",
                "Trial Balance and Rectification of Errors",
                "Depreciation, Provisions and Reserves",
                "Bills of Exchange",
                "Financial Statements - I",
                "Financial Statements - II"
            ]
        },
        {
            "name": "Business Studies",
            "chapters": [
                "Nature and Purpose of Business",
                "Forms of Business Organisation",
                "Public, Private and Global Enterprises",
                "Business Services",
                "Emerging Modes of Business",
                "Social Responsibility of Business & Ethics",
                "Formation of a Company",
                "Sources of Business Finance",
                "Small Business",
                "Internal Trade",
                "International Business"
            ]
        },
        {
            "name": "English",
            "chapters": [
                "The Portrait of a Lady",
                "We're Not Afraid to Die",
                "Discovering Tut: The Saga Continues",
                "Landscape of the Soul",
                "The Ailing Planet",
                "The Browning Version",
                "The Adventure",
                "Silk Road",
                "The Summer of Beautiful White Horse",
                "The Address",
                "Ranga's Marriage",
                "Albert Einstein at School",
                "Mother's Day",
                "The Ghat of the Only World",
                "Birth",
                "The Tale of Melon City"
            ]
        },
        {
            "name": "Micro Economics",
            "chapters": [
                "Introduction to Microeconomics",
                "Theory of Consumer Behaviour",
                "Production and Costs",
                "The Theory of the Firm under Perfect Competition",
                "Market Equilibrium",
                "Non-competitive Markets",
                "Introduction to Macroeconomics",
                "National Income Accounting",
                "Money and Banking",
                "Determination of Income and Employment"
            ]
        },
        {
            "name": "Statistics for Economics",
            "chapters": [
                "Introduction",
                "Collection of Data",
                "Organisation of Data",
                "Presentation of Data",
                "Measures of Central Tendency",
                "Measures of Dispersion",
                "Correlation",
                "Introduction to Index Numbers",
                "Use of Statistical Tools",
                "Comparative Development Experience"
            ]
        },
        {
            "name": "Computer Science",
            "chapters": [
                "Computer System",
                "Encoding Schemes and Number System",
                "Emerging Trends",
                "Introduction to Problem Solving",
                "Getting Started with Python",
                "Flow of Control",
                "Functions",
                "Strings",
                "Lists",
                "Tuples and Dictionary",
                "Introduction to Computer Networks",
                "Internet and Web",
                "More on HTML",
                "Advanced Features of HTML"
            ]
        }
    ];

    function slugify(text) {
        return text.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    function getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    }

    function loadCheckboxState(checkboxId) {
        try {
            const state = localStorage.getItem(`checkbox_${checkboxId}`);
            return state === 'true';
        } catch (error) {
            console.warn('Error loading checkbox state:', error);
            return false;
        }
    }

    function saveCheckboxState(checkboxId, isChecked) {
        try {
            localStorage.setItem(`checkbox_${checkboxId}`, isChecked.toString());
        } catch (error) {
            console.error('Error saving checkbox state:', error);
        }
    }

    function loadDate(checkboxId) {
        try {
            return localStorage.getItem(`date_${checkboxId}`) || '';
        } catch (error) {
            console.warn('Error loading date:', error);
            return '';
        }
    }

    function saveDate(checkboxId, date) {
        try {
            if (date) {
                localStorage.setItem(`date_${checkboxId}`, date);
            } else {
                localStorage.removeItem(`date_${checkboxId}`);
            }
        } catch (error) {
            console.error('Error saving date:', error);
        }
    }

    function calculateProgress(subjectSlug) {
        const checkboxes = document.querySelectorAll(`input[id^="chk-${subjectSlug}-"]`);
        let completed = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                completed++;
            }
        });
        
        const total = checkboxes.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { completed, total, percentage };
    }

    function calculateOverallProgress() {
        let totalCompleted = 0;
        let totalChapters = 0;
        
        subjects.forEach(subject => {
            const subjectSlug = slugify(subject.name);
            const { completed, total } = calculateProgress(subjectSlug);
            totalCompleted += completed;
            totalChapters += total;
        });
        
        const percentage = totalChapters > 0 ? Math.round((totalCompleted / totalChapters) * 100) : 0;
        
        return { totalCompleted, totalChapters, percentage };
    }

    function updateHeroStats() {
        const { totalCompleted, totalChapters, percentage } = calculateOverallProgress();
        
        const totalChaptersEl = document.getElementById('total-chapters');
        const completedChaptersEl = document.getElementById('completed-chapters');
        const overallProgressEl = document.getElementById('overall-progress');
        
        if (totalChaptersEl) totalChaptersEl.textContent = totalChapters;
        if (completedChaptersEl) completedChaptersEl.textContent = totalCompleted;
        if (overallProgressEl) overallProgressEl.textContent = `${percentage}%`;
    }

    function updateDashboardCard(subjectSlug) {
        const { completed, total, percentage } = calculateProgress(subjectSlug);
        
        const completedEl = document.getElementById(`completed-${subjectSlug}`);
        const totalEl = document.getElementById(`total-${subjectSlug}`);
        const percentageEl = document.getElementById(`percentage-${subjectSlug}`);
        const progressFill = document.getElementById(`progress-${subjectSlug}`);
        const progressText = document.getElementById(`progress-text-${subjectSlug}`);
        
        if (completedEl) completedEl.textContent = completed;
        if (totalEl) totalEl.textContent = total;
        if (percentageEl) percentageEl.textContent = `${percentage}%`;
        if (progressText) progressText.textContent = `${percentage}%`;
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
            if (percentage === 100) {
                progressFill.classList.add('complete');
            } else {
                progressFill.classList.remove('complete');
            }
        }
        
        updateHeroStats();
    }

    function handleCheckboxChange(event) {
        const checkbox = event.target;
        const checkboxId = checkbox.id;
        const isChecked = checkbox.checked;
        const row = checkbox.closest('tr');
        const dateCell = row.querySelector('.date-cell');
        
        saveCheckboxState(checkboxId, isChecked);
        
        if (isChecked) {
            const currentDate = getCurrentDate();
            const formattedDate = formatDate(currentDate);
            dateCell.textContent = formattedDate;
            saveDate(checkboxId, currentDate);
            row.classList.add('completed-row');
        } else {
            dateCell.textContent = '';
            saveDate(checkboxId, '');
            row.classList.remove('completed-row');
        }
        
        const subjectSlug = checkboxId.split('-')[1];
        setTimeout(() => {
            updateDashboardCard(subjectSlug);
        }, 10);
        
        if (isChecked) {
            const checkboxContainer = checkbox.parentNode;
            checkboxContainer.style.transform = 'scale(1.1)';
            setTimeout(() => {
                checkboxContainer.style.transform = 'scale(1)';
            }, 150);
        }
    }

    function toggleSubjectSection(subjectSlug) {
        const section = document.getElementById(`section-${subjectSlug}`);
        if (section) {
            section.classList.toggle('open');
            const header = section.querySelector('.subject-header');
            if (header) {
                const isOpen = section.classList.contains('open');
                header.setAttribute('aria-expanded', isOpen);
            }
        }
    }

    function handleChapterNameClick(checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
            
            const row = checkbox.closest('tr');
            const nameCell = row.querySelector('.name-col');
            nameCell.style.transform = 'scale(1.02)';
            setTimeout(() => {
                nameCell.style.transform = 'scale(1)';
            }, 150);
        }
    }

    function createDashboardGrid() {
        const dashboardGrid = document.getElementById('dashboard-grid');
        if (!dashboardGrid) return;
        
        dashboardGrid.innerHTML = '';
        
        subjects.forEach((subject) => {
            const subjectSlug = slugify(subject.name);
            const icon = subject.name.charAt(0).toUpperCase();
            
            const card = document.createElement('div');
            card.className = 'dashboard-card';
            card.innerHTML = `
                <div class="dashboard-card-header">
                    <h3 class="dashboard-card-title">${subject.name}</h3>
                    <div class="dashboard-card-icon">${icon}</div>
                </div>
                <div class="dashboard-stats">
                    <div class="dashboard-stat">
                        <span id="completed-${subjectSlug}" class="dashboard-stat-number">0</span>
                        <span class="dashboard-stat-label">Completed</span>
                    </div>
                    <div class="dashboard-stat">
                        <span id="total-${subjectSlug}" class="dashboard-stat-number">${subject.chapters.length}</span>
                        <span class="dashboard-stat-label">Total</span>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span id="progress-text-${subjectSlug}">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div id="progress-${subjectSlug}" class="progress-fill" style="width: 0%"></div>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                const subjectSection = document.getElementById(`section-${subjectSlug}`);
                if (subjectSection) {
                    subjectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (!subjectSection.classList.contains('open')) {
                        toggleSubjectSection(subjectSlug);
                    }
                }
            });
            
            dashboardGrid.appendChild(card);
        });
    }

    function createSubjectSections() {
        const subjectsContainer = document.querySelector('.subjects-container');
        if (!subjectsContainer) return;
        
        subjectsContainer.innerHTML = '';
        
        subjects.forEach((subject) => {
            const subjectSlug = slugify(subject.name);
            
            const section = document.createElement('div');
            section.className = 'subject-section';
            section.id = `section-${subjectSlug}`;
            
            const header = document.createElement('div');
            header.className = 'subject-header';
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-expanded', 'false');
            header.innerHTML = `
                <h3 class="subject-title">${subject.name}</h3>
                <span class="subject-toggle">▼</span>
            `;
            
            header.addEventListener('click', () => toggleSubjectSection(subjectSlug));
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSubjectSection(subjectSlug);
                }
            });
            
            const content = document.createElement('div');
            content.className = 'subject-content';
            
            const tableContainer = document.createElement('div');
            tableContainer.className = 'chapter-table-container';
            
            const table = document.createElement('table');
            table.className = 'chapter-table';
            
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th class="chapter-col">Ch</th>
                    <th class="name-col">Chapter Name</th>
                    <th class="checkbox-col">Done</th>
                    <th class="date-col">Completed</th>
                </tr>
            `;
            
            const tbody = document.createElement('tbody');
            
            subject.chapters.forEach((chapter, chapterIndex) => {
                const checkboxId = `chk-${subjectSlug}-${chapterIndex}`;
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td class="chapter-col">${chapterIndex + 1}</td>
                    <td class="name-col chapter-name-clickable">${chapter}</td>
                    <td class="checkbox-col">
                        <div class="chapter-checkbox">
                            <input type="checkbox" id="${checkboxId}">
                            <div class="checkbox-custom"></div>
                        </div>
                    </td>
                    <td class="date-col date-cell"></td>
                `;
                
                tbody.appendChild(row);
                
                const chapterNameCell = row.querySelector('.chapter-name-clickable');
                chapterNameCell.addEventListener('click', () => {
                    handleChapterNameClick(checkboxId);
                });
            });
            
            table.appendChild(thead);
            table.appendChild(tbody);
            tableContainer.appendChild(table);
            content.appendChild(tableContainer);
            
            section.appendChild(header);
            section.appendChild(content);
            subjectsContainer.appendChild(section);
        });
    }

    function initializeCheckboxStates() {
        subjects.forEach((subject) => {
            const subjectSlug = slugify(subject.name);
            
            subject.chapters.forEach((chapter, chapterIndex) => {
                const checkboxId = `chk-${subjectSlug}-${chapterIndex}`;
                const checkbox = document.getElementById(checkboxId);
                
                if (checkbox) {
                    const row = checkbox.closest('tr');
                    const dateCell = row.querySelector('.date-cell');
                    
                    const isChecked = loadCheckboxState(checkboxId);
                    const savedDate = loadDate(checkboxId);
                    
                    checkbox.checked = isChecked;
                    
                    if (isChecked) {
                        if (savedDate) {
                            dateCell.textContent = formatDate(savedDate);
                        }
                        row.classList.add('completed-row');
                    }
                    
                    checkbox.addEventListener('change', handleCheckboxChange);
                }
            });
            
            updateDashboardCard(subjectSlug);
        });
        
        updateHeroStats();
    }

    function addScrollEffects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.dashboard-card, .subject-section').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    function init() {
        try {
            createDashboardGrid();
            createSubjectSections();
            setTimeout(() => {
                initializeCheckboxStates();
                addScrollEffects();
                if (subjects.length > 0) {
                    const firstSubjectSlug = slugify(subjects[0].name);
                    toggleSubjectSection(firstSubjectSlug);
                }
            }, 250);
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }

    document.addEventListener('keydown', (e) => {
        if ((e.key === ' ' || e.key === 'Enter') && e.target.type === 'checkbox') {
            e.preventDefault();
            e.target.checked = !e.target.checked;
            e.target.dispatchEvent(new Event('change'));
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(() => {
                updateHeroStats();
                subjects.forEach(subject => {
                    const subjectSlug = slugify(subject.name);
                    updateDashboardCard(subjectSlug);
                });
            }, 100);
        }
    });

    // We need to check if the DOM is already loaded, otherwise the event listener might not fire.
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

    // Cleanup function for when the component unmounts
    return () => {
        document.removeEventListener('DOMContentLoaded', init);
        // You might need to remove other event listeners here if they cause issues.
    };
  }, []); // Empty dependency array means this effect runs once on mount.

  return (
    <>
      <style jsx global>{`
        /* All the CSS from the original page.html */
        :root {
          --color-white: rgba(255, 255, 255, 1);
          --color-black: rgba(0, 0, 0, 1);
          --color-cream-50: rgba(252, 252, 249, 1);
          --color-cream-100: rgba(255, 255, 253, 1);
          --color-gray-200: rgba(245, 245, 245, 1);
          --color-gray-300: rgba(167, 169, 169, 1);
          --color-gray-400: rgba(119, 124, 124, 1);
          --color-slate-500: rgba(98, 108, 113, 1);
          --color-brown-600: rgba(94, 82, 64, 1);
          --color-charcoal-700: rgba(31, 33, 33, 1);
          --color-charcoal-800: rgba(38, 40, 40, 1);
          --color-slate-900: rgba(19, 52, 59, 1);
          --color-teal-300: rgba(50, 184, 198, 1);
          --color-teal-400: rgba(45, 166, 178, 1);
          --color-teal-500: rgba(33, 128, 141, 1);
          --color-teal-600: rgba(29, 116, 128, 1);
          --color-teal-700: rgba(26, 104, 115, 1);
          --color-teal-800: rgba(41, 150, 161, 1);
          --color-red-400: rgba(255, 84, 89, 1);
          --color-red-500: rgba(192, 21, 47, 1);
          --color-orange-400: rgba(230, 129, 97, 1);
          --color-orange-500: rgba(168, 75, 47, 1);
          --color-brown-600-rgb: 94, 82, 64;
          --color-teal-500-rgb: 33, 128, 141;
          --color-slate-900-rgb: 19, 52, 59;
          --color-slate-500-rgb: 98, 108, 113;
          --color-red-500-rgb: 192, 21, 47;
          --color-red-400-rgb: 255, 84, 89;
          --color-orange-500-rgb: 168, 75, 47;
          --color-orange-400-rgb: 230, 129, 97;
          --color-background: var(--color-cream-50);
          --color-surface: var(--color-cream-100);
          --color-text: var(--color-slate-900);
          --color-text-secondary: var(--color-slate-500);
          --color-primary: var(--color-teal-500);
          --color-primary-hover: var(--color-teal-600);
          --color-primary-active: var(--color-teal-700);
          --color-secondary: rgba(var(--color-brown-600-rgb), 0.12);
          --color-secondary-hover: rgba(var(--color-brown-600-rgb), 0.2);
          --color-secondary-active: rgba(var(--color-brown-600-rgb), 0.25);
          --color-border: rgba(var(--color-brown-600-rgb), 0.2);
          --color-btn-primary-text: var(--color-cream-50);
          --color-card-border: rgba(var(--color-brown-600-rgb), 0.12);
          --color-card-border-inner: rgba(var(--color-brown-600-rgb), 0.12);
          --color-error: var(--color-red-500);
          --color-success: var(--color-teal-500);
          --color-warning: var(--color-orange-500);
          --color-info: var(--color-slate-500);
          --color-focus-ring: rgba(var(--color-teal-500-rgb), 0.4);
          --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --gradient-success: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --gradient-card: linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
          --duration-fast: 150ms;
          --duration-normal: 250ms;
          --duration-slow: 350ms;
          --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
          --space-1: 4px;
          --space-2: 8px;
          --space-3: 12px;
          --space-4: 16px;
          --space-5: 20px;
          --space-6: 24px;
          --space-8: 32px;
          --space-10: 40px;
          --space-12: 48px;
          --space-16: 64px;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --radius-xl: 24px;
          --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
          --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
          --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.12);
          --shadow-2xl: 0 24px 48px rgba(0, 0, 0, 0.15);
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --color-background: var(--color-charcoal-700);
            --color-surface: var(--color-charcoal-800);
            --color-text: var(--color-gray-200);
            --color-text-secondary: rgba(167, 169, 169, 0.7);
            --color-primary: var(--color-teal-300);
            --color-card-border: rgba(119, 124, 124, 0.15);
            --gradient-card: linear-gradient(145deg, rgba(38, 40, 40, 0.9) 0%, rgba(31, 33, 33, 0.7) 100%);
          }
        }
        .hero-header {
          background: var(--gradient-primary);
          padding: var(--space-16) 0;
          position: relative;
          overflow: hidden;
        }
        .hero-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          animation: float 20s linear infinite;
        }
        @keyframes float {
          0% { transform: translateX(0px) translateY(0px); }
          100% { transform: translateX(-60px) translateY(-60px); }
        }
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          position: relative;
          z-index: 1;
        }
        .hero-content {
          text-align: center;
          color: white;
        }
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: var(--space-3);
          background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.25rem);
          margin-bottom: var(--space-8);
          opacity: 0.9;
          font-weight: 400;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--space-6);
          max-width: 600px;
          margin: 0 auto;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: var(--space-5);
          border-radius: var(--radius-lg);
          text-align: center;
          transition: transform var(--duration-normal) var(--ease-standard);
        }
        .stat-card:hover {
          transform: translateY(-2px);
        }
        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: white;
        }
        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }
        .main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-16) var(--space-6);
        }
        .section {
          margin-bottom: var(--space-16);
        }
        .section-header {
          text-align: center;
          margin-bottom: var(--space-12);
        }
        .section-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: var(--space-3);
        }
        .section-description {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-6);
          margin-bottom: var(--space-8);
        }
        .dashboard-card {
          background: var(--gradient-card);
          backdrop-filter: blur(10px);
          border: 1px solid var(--color-card-border);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          box-shadow: var(--shadow-lg);
          transition: all var(--duration-normal) var(--ease-standard);
          position: relative;
          overflow: hidden;
        }
        .dashboard-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
        }
        .dashboard-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--shadow-2xl);
          cursor: pointer;
        }
        .dashboard-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-4);
        }
        .dashboard-card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text);
        }
        .dashboard-card-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.125rem;
        }
        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-5);
        }
        .dashboard-stat {
          text-align: center;
          padding: var(--space-3);
          background: rgba(var(--color-teal-500-rgb), 0.08);
          border-radius: var(--radius-md);
          border: 1px solid rgba(var(--color-teal-500-rgb), 0.15);
        }
        .dashboard-stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .dashboard-stat-label {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }
        .progress-container {
          margin-top: var(--space-4);
        }
        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-2);
          font-size: 0.875rem;
          font-weight: 500;
        }
        .progress-bar {
          height: 12px;
          background: rgba(var(--color-teal-500-rgb), 0.15);
          border-radius: var(--radius-sm);
          overflow: hidden;
          position: relative;
        }
        .progress-fill {
          height: 100%;
          background: var(--gradient-success);
          border-radius: var(--radius-sm);
          transition: width var(--duration-slow) var(--ease-standard);
          position: relative;
          overflow: hidden;
        }
        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .progress-fill.complete {
          background: var(--gradient-success);
        }
        .subjects-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .subject-section {
          background: var(--gradient-card);
          backdrop-filter: blur(10px);
          border: 1px solid var(--color-card-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all var(--duration-normal) var(--ease-standard);
        }
        .subject-section:hover {
          box-shadow: var(--shadow-xl);
        }
        .subject-header {
          padding: var(--space-6);
          background: var(--gradient-primary);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all var(--duration-normal) var(--ease-standard);
          user-select: none;
        }
        .subject-header:hover {
          background-size: 110% 110%;
        }
        .subject-title {
          font-size: 1.375rem;
          font-weight: 600;
          margin: 0;
        }
        .subject-toggle {
          font-size: 1.5rem;
          transition: transform var(--duration-normal) var(--ease-standard);
          opacity: 0.8;
        }
        .subject-section.open .subject-toggle {
          transform: rotate(180deg);
        }
        .subject-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--duration-slow) var(--ease-standard);
        }
        .subject-section.open .subject-content {
          max-height: 2000px;
        }
        .chapter-table-container {
          padding: var(--space-6);
        }
        .chapter-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .chapter-table thead {
          background: rgba(var(--color-teal-500-rgb), 0.08);
        }
        .chapter-table th {
          padding: var(--space-4);
          text-align: left;
          font-weight: 600;
          color: var(--color-text);
          border-bottom: 2px solid var(--color-card-border);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .chapter-table td {
          padding: var(--space-4);
          border-bottom: 1px solid var(--color-card-border);
          transition: all var(--duration-fast) var(--ease-standard);
        }
        .chapter-table tbody tr:hover {
          background: rgba(var(--color-teal-500-rgb), 0.04);
        }
        .chapter-table .chapter-col {
          width: 60px;
          text-align: center;
          font-weight: 600;
          color: var(--color-primary);
        }
        .chapter-table .name-col {
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-standard);
          user-select: none;
          padding: var(--space-4);
          border-radius: var(--radius-sm);
        }
        .chapter-table .name-col:hover {
          background-color: rgba(var(--color-teal-500-rgb), 0.08);
          color: var(--color-primary);
        }
        .chapter-table .checkbox-col {
          width: 80px;
          text-align: center;
        }
        .chapter-table .date-col {
          width: 120px;
          color: var(--color-text-secondary);
          font-size: 0.8125rem;
        }
        .chapter-checkbox {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
        }
        .chapter-checkbox input[type="checkbox"] {
          opacity: 0;
          position: absolute;
          width: 20px;
          height: 20px;
          margin: 0;
          cursor: pointer;
        }
        .checkbox-custom {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          background: var(--color-surface);
          border: 2px solid var(--color-card-border);
          border-radius: var(--radius-sm);
          transition: all var(--duration-fast) var(--ease-standard);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .checkbox-custom::after {
          content: '✓';
          color: white;
          font-size: 12px;
          font-weight: 700;
          opacity: 0;
          transform: scale(0);
          transition: all var(--duration-fast) var(--ease-bounce);
        }
        .chapter-checkbox input[type="checkbox"]:checked + .checkbox-custom {
          background: var(--gradient-success);
          border-color: var(--color-primary);
          box-shadow: 0 2px 8px rgba(var(--color-teal-500-rgb), 0.3);
        }
        .chapter-checkbox input[type="checkbox"]:checked + .checkbox-custom::after {
          opacity: 1;
          transform: scale(1);
        }
        .completed-row {
          opacity: 0.7;
        }
        .completed-row .name-col {
          text-decoration: line-through;
          color: var(--color-success) !important;
        }
        .completed-row .name-col:hover {
          opacity: 1;
          background-color: rgba(var(--color-success), 0.08) !important;
        }
        .footer {
          background: var(--gradient-card);
          border-top: 1px solid var(--color-card-border);
          padding: var(--space-8) 0;
          margin-top: var(--space-16);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-4);
        }
        .footer-text {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }
        .footer-badge {
          background: var(--gradient-primary);
          color: white;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        @media (max-width: 768px) {
          .hero-stats, .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .main-container {
            padding: var(--space-8) var(--space-4);
          }
          .chapter-table .date-col {
            display: none;
          }
          .chapter-table th, .chapter-table td {
            padding: var(--space-3);
            font-size: 0.8125rem;
          }
          .subject-header {
            padding: var(--space-4);
          }
          .subject-title {
            font-size: 1.125rem;
          }
          .footer-content {
            flex-direction: column;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .hero-container {
            padding: 0 var(--space-4);
          }
          .chapter-table-container {
            padding: var(--space-4);
          }
          .dashboard-stats {
            grid-template-columns: 1fr;
          }
          .dashboard-card {
            padding: var(--space-4);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .loading {
          animation: pulse 2s infinite;
        }
      `}</style>
      <div id="app">
        <header className="hero-header">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">Class 11 Commerce Study Tracker</h1>
              <p className="hero-subtitle">Track your progress across all subjects and stay motivated</p>
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-number" id="total-chapters">0</span>
                  <span className="stat-label">Total Chapters</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number" id="completed-chapters">0</span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number" id="overall-progress">0%</span>
                  <span className="stat-label">Overall Progress</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="main-container">
          <section id="dashboard-section" className="section">
            <div className="section-header">
              <h2 className="section-title">Progress Overview</h2>
              <p className="section-description">Monitor your progress across all subjects</p>
            </div>
            <div className="dashboard-grid" id="dashboard-grid"></div>
          </section>
          <section id="subjects-section" className="section">
            <div className="section-header">
              <h2 className="section-title">Subject Details</h2>
              <p className="section-description">Click on any subject to view and manage chapters. Click chapter names or checkboxes to mark as complete!</p>
            </div>
            <div className="subjects-container"></div>
          </section>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p className="footer-text">✓ Click chapter names or checkboxes to mark complete • Auto-save enabled • Progress updates in real-time</p>
            <div className="footer-badge">
              <span>Study Tracker v2.1</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactPage;