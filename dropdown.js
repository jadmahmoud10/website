document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('.select-wrapper select');

    // Close the dropdown after selecting an option
    select.addEventListener('change', () => {
        select.blur(); // Unfocus to close the dropdown
    });

    // Close the dropdown if clicking outside of it
    document.addEventListener('click', (e) => {
        if (!select.contains(e.target)) {
            select.blur(); // Unfocus to ensure the dropdown is closed
        }
    });
});
