const loginForm = document.getElementById('login-form')
const eError = document.getElementById('email-error')
const pError = document.getElementById('password-error')
const courseCount = document.getElementById("paper-info")
const loginButton = document.getElementById('login-button')
const dropdownLoginButton = document.getElementById('dropdown-login-button')
const clearFilter = document.getElementById('clear-filter')
const form = document.querySelector(".pq-page-second-section-top")
const homeForm = document.getElementById('home-form')
const courseSearch = document.getElementById('courseSearch')
const levelCardWrapper = document.getElementById('level-card-wrapper')
const levelSearch = document.getElementById('level-dropdown')
const collegeCardWrapper = document.getElementById('college-card-wrapper')
const collegeSearch = document.getElementById('college-dropdown')
const collegePageButtons = document.querySelectorAll('.college-page-btn')
const openBtn = document.getElementById('open-btn')
const closeBtn = document.getElementById('close-btn')
const previewPageNav = document.getElementById('preview-page-nav')
const main = document.getElementById('main')


const currentURL = window.location.href

document.querySelectorAll('.link').forEach(link => {
    if (currentURL.includes(link.getAttribute('href'))) {
        link.classList.add('active')
    }
})


if (openBtn) {
    openBtn.addEventListener('click', () => {
        const navDropdown = document.getElementById('header-dropdown')
        navDropdown.classList.add('show')
        openBtn.classList.add('hide')
        closeBtn.classList.add('show')
    })
}
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        const navDropdown = document.getElementById('header-dropdown')
        navDropdown.classList.remove('show')
        closeBtn.classList.remove('show')
        openBtn.classList.remove('hide')
    })
}

if (collegePageButtons) {
    collegePageButtons.forEach(collegePageButton => {
        collegePageButton.addEventListener('click', (e) => {
            const clickedCollegeCard = e.target.closest('.college-page-college')
            const clickedCollege = clickedCollegeCard.querySelector('h4').textContent
            let sentCollege = ''

            if (clickedCollege === 'College of Engineering') {
                sentCollege = 'COE'
            } else if (clickedCollege === 'College of Law') {
                sentCollege = 'COL'
            } else if (clickedCollege === 'College of Science and Technology') {
                sentCollege = 'CST'
            } else if (clickedCollege === 'College of Management and Social Sciences') {
                sentCollege = 'CMSS'
            }

            window.location.href = `pq.html?college=${sentCollege}`
        })
    })
}

if (levelCardWrapper) {
    levelCardWrapper.addEventListener('click', (e) => {
        const levelCard = e.target.closest('.level-card')
        const levelClicked = levelCard.querySelector('h3').textContent
        window.location.href = `pq.html?level=${levelClicked}`
    })
}

if (collegeCardWrapper) {
    collegeCardWrapper.addEventListener('click', (e) => {
        const collegeCard = e.target.closest('.college-card')
        const collegeClicked = collegeCard.querySelector('h4').textContent
        let collegeSent = ''
        if (collegeClicked === 'College of Engineering') {
            collegeSent = 'COE'
        } else if (collegeClicked === 'College of Science and Tech') {
            collegeSent = 'CST'
        } else if (collegeClicked === 'College of Law') {
            collegeSent = 'COL'
        } else if (collegeClicked === 'College of Management Sciences') {
            collegeSent = 'CMSS'
        }
        window.location.href = `pq.html?college=${collegeSent}`
    })
}


const questions = [{ id: 1, college: 'COE', title: 'GET 341', session: '2025/2026', level: '300 Level', pdf: 'GET341', courseTitle: "Engineering Materials",prevFile : "prev1" },
{ id: 2, college: 'COE', title: 'GET 341', session: '2024/2025', level: '300 Level', pdf: 'GET341_X', courseTitle: "Engineering Materials" , prevFile : "prev2" },
{ id: 3, college: 'COE', title: 'GET 341', session: '2023/2024', level: '300 Level', pdf: 'GET341_XX', courseTitle: "Engineering Materials", prevFile : "prev3"  },
{ id: 4, college: 'CST', title: 'CSC 201', session: '2025/2026', level: '200 Level', pdf: 'CSC201', courseTitle: "Intro to Python", prevFile : "prev4"  },
{ id: 5, college: 'CST', title: 'CSC 201', session: '2023/2024', level: '200 Level', pdf: 'CSC201_X', courseTitle: 'Intro to Python', prevFile : "prev5"  },
{ id: 6, college: 'CST', title: 'CHM 211', session: '2023/2024', level: '200 Level', pdf: 'CHM211', courseTitle: 'Applied Chemistry', prevFile : "prev6"  }]

if (homeForm) {
    homeForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const homeSearch = document.getElementById('homepage-search').value
        window.location.href = `pq.html?search=${homeSearch}`
    })
}

if(previewPageNav){
    const params = new URLSearchParams(window.location.search)
    const prevFileName = params.get('previewFile')
    const prevPageQuestion = questions.find(question => question.prevFile === prevFileName)
    const firstTitleDisplay = document.createElement('strong')
    firstTitleDisplay.textContent = prevPageQuestion.title
    firstTitleDisplay.id = 'courseCode'
    previewPageNav.appendChild(firstTitleDisplay)

     document.getElementById('section1-courseCode').textContent =
            prevPageQuestion.title


        // ---------- COURSE TITLE ----------
        document.getElementById('section1-courseTitle').textContent =
            prevPageQuestion.courseTitle


        // ---------- LEVEL ----------
        document.querySelector('.lvl-Text').textContent =
            prevPageQuestion.level


        // ---------- COLLEGE ----------
        document.querySelector('.coll').textContent =
            prevPageQuestion.college


        // ---------- SESSION ----------
        document.querySelector('.sesh').textContent =
            `${prevPageQuestion.session} Academic Session`


        // ---------- PREVIEW IMAGE ----------
        document.getElementById('previewImage').src =
            `previews/${prevPageQuestion.prevFile}.png`


        // ---------- DOWNLOAD BUTTONS ----------
        const downloadButtons =
            document.querySelectorAll('.preview-page-download-btn')

        downloadButtons.forEach(button => {
            button.href = `questions/${prevPageQuestion.pdf}.pdf`
            button.download = ''
        })


}

function filterQuestions() {
    const typedCourse = document.getElementById('courseSearch').value.replace(/\s/g, "").toLowerCase()
    const selectedCollege = document.getElementById('college-dropdown').value
    const selectedLevel = document.getElementById('level-dropdown').value
    const selectedSession = document.getElementById('session-dropdown').value


    const filtered = questions.filter(question => {
        let passedCourse = false
        let passedCollege = false
        let passedLevel = false
        let passedSession = false
        if (typedCourse === '' || question.title.replace(/\s/g, "").toLowerCase().includes(typedCourse) || question.courseTitle.replace(/\s/g, "").toLowerCase().includes(typedCourse)) {
            passedCourse = true
        }

        if (selectedCollege === question.college || selectedCollege === '') {
            passedCollege = true
        }
        if (selectedLevel === '' || selectedLevel === question.level) {
            passedLevel = true
        }
        if (selectedSession === '' || selectedSession === question.session) {
            passedSession = true
        }

        // if (passedCourse && passedCollege && passedLevel && passedSession) {
        //     return question
        // }  This is correct, but the one down is also correct, because the you are telling the filter method to return the object if it passed all the tests

        return passedCollege && passedCourse && passedLevel && passedSession


    })

    courseCount.textContent = `Showing ${filtered.length} question ${filtered.length === 1 ? 'paper' : 'papers'}`


    const courseContainer = document.getElementById('course-cards')
    courseContainer.innerHTML = ''
    filtered.forEach(question => {

        const courseCard = document.createElement('div')
        courseCard.classList.add('course-card')




        const textSection = document.createElement('div')
        textSection.classList.add('text-section')



        const icon = document.createElement('div')
        icon.classList.add('homepage-icon', 'courseIcon')

        icon.innerHTML = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5985E1"
        >
            <path
                d="M280-80q-33 0-56.5-23.5T200-160v-640q0-33 23.5-56.5T280-880h247q16 0 30.5 6t25.5 17l154 154q11 11 17 25.5t6 30.5v487q0 33-23.5 56.5T680-80H280Zm160-720H280v640h400v-400H560q-50 0-85-35t-35-85v-120Zm80 0v120q0 17 11.5 28.5T560-640h120v-7L527-800h-7ZM400-200q-17 0-28.5-11.5T360-240q0-17 11.5-28.5T400-280h80q17 0 28.5 11.5T520-240q0 17-11.5 28.5T480-200h-80Zm0-160q-17 0-28.5-11.5T360-400q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400q0 17-11.5 28.5T560-360H400Z"
            />
        </svg>
    `



        const text = document.createElement('div')
        text.classList.add('text')



        const text1 = document.createElement('div')
        text1.classList.add('text1')

        const text1_1 = document.createElement('p')
        text1_1.classList.add('text1_1')
        text1_1.textContent = question.title

        const text1_2 = document.createElement('p')
        text1_2.classList.add('text1_2')
        text1_2.textContent = question.level

        text1.appendChild(text1_1)
        text1.appendChild(text1_2)



        const text2 = document.createElement('p')
        text2.classList.add('text2')
        text2.textContent = question.courseTitle


        const text3 = document.createElement('div')
        text3.classList.add('text3')

        const text3_1 = document.createElement('p')
        text3_1.classList.add('text3_1')
        text3_1.textContent = question.college

        const text3_2 = document.createElement('p')
        text3_2.classList.add('text3_2')
        text3_2.textContent = `${question.session} Session`

        text3.appendChild(text3_1)
        text3.appendChild(text3_2)


        text.appendChild(text1)
        text.appendChild(text2)
        text.appendChild(text3)


        textSection.appendChild(icon)
        textSection.appendChild(text)




        const btnSection = document.createElement('div')
        btnSection.classList.add('btn-section')



        const viewBtn = document.createElement('a')
        viewBtn.classList.add('view-btn')
        viewBtn.textContent = 'View'
        viewBtn.href = `preview.html?previewFile=${question.prevFile}`



        const downloadBtn = document.createElement('a')
        downloadBtn.classList.add('download-btn')
        downloadBtn.download = ''
        downloadBtn.href = `questions/${question.pdf}.pdf`
        downloadBtn.textContent = 'Download PDF'



        btnSection.appendChild(viewBtn)
        btnSection.appendChild(downloadBtn)




        courseCard.appendChild(textSection)
        courseCard.appendChild(btnSection)

        courseContainer.appendChild(courseCard)

    })



}



if (clearFilter) {
    clearFilter.addEventListener('click', () => {
        document.getElementById('courseSearch').value = ''
        document.getElementById('college-dropdown').value = ''
        document.getElementById('level-dropdown').value = ''
        document.getElementById('session-dropdown').value = ''

        filterQuestions()
    })
}
if (courseSearch) {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("search");

    if (searchValue) {
        courseSearch.value = searchValue;
        filterQuestions();
    }
}
if (levelSearch) {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("level");

    if (searchValue) {
        levelSearch.value = searchValue;
        filterQuestions();
    }

}
if (collegeSearch) {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("college");


    if (searchValue) {
        collegeSearch.value = searchValue;
        filterQuestions();
    }

}
if (form) {
    filterQuestions()
    form.addEventListener('input', filterQuestions)
    form.addEventListener('change', filterQuestions)
}

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {

        const password = document.getElementById('password').value.trim()
        const email = document.getElementById("email").value


        let passwordError = ''
        let emailError = ''
        e.preventDefault()

        if (password === '') {
            passwordError = 'Password is required'
        } else if (password.length < 8) {
            passwordError = 'Password must be at least 8 characters'
        }

        if (email === '') {
            emailError = 'Email is required'
        } else if (!email.includes('@') || email.split('@')[1].length === 0 || email.split('@')[0].length < 1 || !email.split('@')[1].includes('.') || email.split('@')[1].split('.')[0].length < 1 || email.split('@')[1].split('.')[1].length < 2) {
            emailError = "Invalid Email"
        }
        pError.textContent = passwordError
        eError.textContent = emailError


        if (passwordError || emailError) {
            return;
        }

        document.getElementById('password').value = ''
        document.getElementById("email").value = ''

        localStorage.setItem("loggedIn", "true");
        window.location.href = 'index.html'

    })
}


if (loginButton) {

    const loggedIn = localStorage.getItem('loggedIn')
    if (loggedIn === 'true') {
        loginButton.textContent = 'Logout'
    }
    loginButton.addEventListener('click', () => {

        if (localStorage.getItem('loggedIn') === 'true') {
            window.location.href = 'login.html'
            localStorage.removeItem('loggedIn')
        }
    })
}

if (dropdownLoginButton) {
    const loggedIn = localStorage.getItem('loggedIn')
    if (loggedIn === 'true') {
        dropdownLoginButton.textContent = 'Logout'
    }
    dropdownLoginButton.addEventListener('click', () => {

        if (localStorage.getItem('loggedIn') === 'true') {
            window.location.href = 'login.html'
            localStorage.removeItem('loggedIn')
        }
    })
}