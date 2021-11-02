const commentFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const comment = document.querySelector('#comment-body').value.trim();
  const path = window.location.pathname;
  const post_id = parseInt(path.substr(path.lastIndexOf('/') + 1));

  if (comment) {
    // Send the comment to the server
    const response = await fetch(`/api/posts/${post_id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ body: comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.reload();
    }
  }
};

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);