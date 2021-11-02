const deleteButtonHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const post_id = event.target.dataset.id;

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    location.reload();
  }

};

document.querySelectorAll('.delete-button').forEach(deleteButton => {
  deleteButton.addEventListener('click', deleteButtonHandler);
});