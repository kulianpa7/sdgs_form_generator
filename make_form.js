const single_selector = (component, data, index) => {
    const $component = $(component); // 確保只操作當前元件
    $component.find(".form-label").text(data.text_title);
    const $form = $component.find(".check-form").empty(); // 清空內容避免重複
    data.data.forEach(option => {
        const optionId = `${option}_${index}`; // 為每個選項生成唯一的 ID
        $form.append(`
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radio-options_${index}" value="${option}" id="${optionId}">
                <label class="form-check-label" for="${optionId}">${option}</label>
            </div>
        `);
    });
    $component.removeClass("ungenerate");
};
const multiple_selector = (component, data, index) => {
    const $component = $(component);
    $component.find(".form-label").text(data.text_title);
    const $form = $component.find(".check-form").empty();
    data.data.forEach(option => {
        const optionId = `${option}_${index}`; // 為每個選項生成唯一的 ID
        $form.append(`
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${option}" id="${optionId}">
                <label class="form-check-label" for="${optionId}">${option}</label>
            </div>
        `);
    });
    $component.removeClass("ungenerate");
};

const text_label = (component, data, index) => {
    const $component = $(component);
    $component.append(`
        <div class="mb-3">
            <label for="string-input" class="form-label">${data.text_title}</label>
            <input type="text" id="${data.data}_${index}" class="form-control" placeholder="${data.data}">
        </div>
    `);
    $component.removeClass("ungenerate");
};

const urlc = (component, data, index) => {
    const $component = $(component);
    $component.append(`
        <label class="form-label">${data.text_title}</label>
        <a href="${data.url}" target="_blank" class="url">${data.url_text}</a>
    `);
    $component.removeClass("ungenerate");
};

const dates = (component, data, index) => {
    const $component = $(component);
    $component.find(".form-label").text(data.text_title);
    $component.find("input").attr("id", `${data.data}_${index}`);
    $component.removeClass("ungenerate");
};
const textarea = (component, data, index) => {
    const $component = $(component);
    $component.find(".form-label").text(data.text_title);
    $component.find("textarea").attr("id", `${data.data}_${index}`);
    $component.removeClass("ungenerate");
};
const timepicker = (component, data, index) => {
    const $component = $(component);
    $component.find(".form-label").text(data.text_title);
    $component.find("input").attr("id", `${data.data}_${index}`);
    $component.removeClass("ungenerate");
};
const combo_selector = (component, data, index) => {
    const $component = $(component);
    $component.find(".form-label").text(data.text_title); // 動態設置標籤內容
    const $select = $component.find("select").attr("id", `${data.data}_${index}`).empty(); // 清空並設置 ID

    // 動態生成選項
    data.data.forEach(option => {
        $select.append(`<option value="${option}">${option}</option>`);
    });

    $component.removeClass("ungenerate"); // 移除初始化樣式
};

const componentsCache = {}; // 用於緩存已加載的組件
const formContainer = $('#form-container'); // 表單容器

// 預定義所有需要的組件路徑
const componentUrls = {
    string: "component/text_label.html",
    multiple_selector: "component/multiple-selector.html",
    single_selector: "component/single-selector.html",
    url: "component/url.html",
    date: "component/dates.html",
    textarea: "component/textarea.html",
    time: "component/time.html",
    combo_selector: "component/combo_selector.html"
};

try {
    // 預先載入所有組件
    await Promise.all(
        Object.entries(componentUrls).map(async ([type, url]) => {
            try {
                const component = await $.get(url);
                componentsCache[type] = component; // 緩存組件
            } catch (error) {
                console.error(`Failed to load component from ${url}`, error);
            }
        })
    );
}catch(err){
    
}