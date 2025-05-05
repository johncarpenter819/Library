export function validateForm(title, author, pages){
    const errors = [];

    if(!title.trim()){
        errors.push("Title is required.");
    }

    if(!author.trim()){
        errors.push("Author is required.");
    }

    if(!pages.trim()){
        errors.push("Number of pages is required.");
    } else if (isNaN(pages) || Number(pages) <= 0){
        errors.push("Pages must be a positive number.");
    }

    return errors;
}