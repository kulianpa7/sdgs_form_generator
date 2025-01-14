const single_selector = (component, data,index) => {
    const $component = $(component); // 確保只操作當前元件
    $component.find(".form-label").text(data.text_title);
    const $form = $component.find(".check-form").empty(); // 清空內容避免重複
    data.data.forEach(option => {
        $form.append(`
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radio-options" value="${option}" id="${option}_${index}">
                <label class="form-check-label" for="${option}">${option}</label>
            </div>
        `);
    });
    $component.removeClass("ungenerate");
};

const multiple_selector = (component, data,index) => {
    const $component = $(component);
    $component.find(".form-label").text(data.text_title);
    const $form = $component.find(".check-form").empty();
    data.data.forEach(option => {
        $form.append(`
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${option}" id="${option}_${index}">
                <label class="form-check-label" for="${option}">${option}</label>
            </div>
        `);
    });
    $component.removeClass("ungenerate");
};

const text_label = (component, data,index) => {
    const $component = $(component);
    $component.append(`
        <label for="string-input" class="form-label">${data.text_title}</label>
        <input type="text" id="${data.data}_${index}" class="form-control" placeholder="${data.data}">
    `);
    $component.removeClass("ungenerate");
};

const urlc = (component, data,index) => {
    const $component = $(component);
    $component.append(`
        <label class="form-label">${data.text_title}</label>
        <a href="${data.url}" target="_blank" class="url">${data.url_text}</a>
    `);
    $component.removeClass("ungenerate");
};
