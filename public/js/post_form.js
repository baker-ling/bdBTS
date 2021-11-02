const postFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  const postWarning = document.querySelector('#post_warning');

  // Gather the data from the form elements on the page
  const title = document.querySelector('#post-title').value.trim()
  const postBody = document.querySelector('#post-body').value.trim();

  // Get post_id from path if it is set
  const path = window.location.pathname;
  const lastPathSegment = path.substr(path.lastIndexOf('/') + 1);
  const post_id = (lastPathSegment.toLowerCase() !== 'post')
    ? parseInt(lastPathSegment)
    : undefined;

  // make sure the form is properly filled out
  if (!title && !postBody) {
    postWarning.textContent = "You need to enter a title and body for your post.";
    postWarning.classList.remove('is-hidden');
    return;
  }
  if (!title) {
    postWarning.textContent = "You need to enter a title for your post.";
    postWarning.classList.remove('is-hidden');
    return;
  }
  if (!postBody) {
    postWarning.textContent = "You need to enter a body for your post.";
    postWarning.classList.remove('is-hidden');
    return;
  }

  const endpoint = post_id ? `/api/posts/${post_id}` : `/api/posts`
  const method =   post_id ? 'PUT'                   : 'POST'
  const body = JSON.stringify({ title, body: postBody });
  const headers = { 'Content-Type': 'application/json' }

  const response = await fetch(endpoint, { method, body, headers });

  if (response.ok) {
    location.href = '/dashboard';
  } else {
    const {message} = await response.json();
    postWarning.textContent = message;
    postWarning.classList.remove('is-hidden');
  }
};

document.querySelector('#post-form').addEventListener('submit', postFormHandler);