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


async function loadComponents(data,formContainer) {
    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        let url;

        switch (item.type) {
            case "string":
                url = "component/text_label.html";
                break;
            case "multiple_selector":
                url = "component/multiple-selector.html";
                break;
            case "single_selector":
                url = "component/single-selector.html";
                break;
            case "url":
                url = "component/url.html";
                break;
            default:
                console.error(`Unknown type: ${item.type}`);
                continue; // 跳過未知類型
        }

        if (url) {
            try {
                const component = await $.get(url); // 等待載入組件
                const $component = $(component); // 將返回的 HTML 轉為 jQuery 對象
                formContainer.append($component);

                // 根據類型處理元件內容
                switch (item.type) {
                    case "string":
                        text_label($component, item, index); // 傳遞 index
                        break;
                    case "multiple_selector":
                        multiple_selector($component, item, index); // 傳遞 index
                        break;
                    case "single_selector":
                        single_selector($component, item, index); // 傳遞 index
                        break;
                    case "url":
                        urlc($component, item, index); // 傳遞 index
                        break;
                }
            } catch (error) {
                console.error(`Failed to load component from ${url}`, error);
            }
        }
    }
}
