/* let's go! */

const userLink = document.querySelector('#github-user-link');
const userName = document.querySelector('#github-user-handle');
const userAvatar = document.querySelector('#github-user-avatar');
const userReposNumber = document.querySelector('#github-user-repos');
const userLanguage = document.querySelector('#github-repos-languages');
const userTatalStarts = document.querySelector('#github-repos-stars');
const userRepoLink = document.querySelector('#github-repo-link');
const userRepoName = document.querySelector('#github-repo-name');
const userRepoCreated = document.querySelector('#github-repo-created');
const userIssues = document.querySelector('#github-repo-open-issues');
const userWatchers = document.querySelector('#github-repo-watchers');
const userRepoContributors = document.querySelector('#github-repo-contributors');

function getData (url, callback) {
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);
            callback(response );
          }
    } 
    xhr.open("GET", url, true);
    xhr.send();
}

function getUser (response) {
    userName.textContent = response.login;
    userLink.href = response.url;
    userAvatar.src = response.avatar_url;
    userReposNumber.textContent = response.public_repos;
}

function getRepos (response) {
    const topRepo = response[1];
    userTatalStarts.textContent = topRepo.stargazers_count;
    userRepoLink.href = topRepo.html_url;
    userRepoName.textContent = topRepo.name;
    userRepoCreated.textContent = topRepo.created_at;
    userIssues.textContent = topRepo.open_issues;
    userWatchers.textContent = topRepo.watchers;
    getData(topRepo.contributors_url, getContributors)  
    getData(topRepo.languages_url, getLanguages);  
}

function getContributors (response) {
    response.forEach(element => {
    userRepoContributors.textContent += element.login + ' ';
    });
}
function getLanguages (response) {
    userLanguage.textContent = Object.keys(response).join(' ');
}

getData('https://api.github.com/users/ibrahim-jarada',getUser);
getData('https://api.github.com/users/Ibrahim-Jarada/repos',getRepos);
