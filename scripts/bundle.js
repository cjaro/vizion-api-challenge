import * as child from 'child_process';
const author = child.execSync('git config --get user.email').toString().trim();
const commits = child.execSync(`git log --author=${author}`).toString().trim();
console.log("Commits by", author);
console.log(commits);

if (!commits) {
  console.error('This repo has no commits from the current git user. Did you commit your changes?');
  process.exit(1);
}

const bundleName = "take-home-challenge";
const result = child.execSync(`git bundle create ${bundleName}.bundle HEAD main`);
console.log(`Nice work, you created ${bundleName}.bundle`);
console.log('Please upload it using the link sent to you in the initial email.');
