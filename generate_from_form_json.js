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

const only_text = (component, data, index) => {
    const $component = $(component);
    $component.append(`
        <div class="mb-3">
            <label for="string-input" class="form-label">${data.text}</label>
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

const data = [{
    type: "string",
    text_title: "輸入框標題:",
    data: "請輸入標題文字"
},
{
    type: "multiple_selector",
    text_title: "這是個多選的選項",
    data: ["SD1", "SD2", "SD3", "sdgs"]
},
{
    type: "single_selector",
    text_title: "這是個單選的選項",
    data: ["SD1", "SD2", "SD3"]
},
{
    type: "url",
    text_title: "這是個網址:",
    url_text: "點我連進去",
    url: "https://google.com/"
}, {
    type: "date",
    text_title: "選擇日期",
    data: "date_field"
}, {
    type: "textarea",
    text_title: "請輸入描述",
    data: "description"
}, {
    type: "time",
    text_title: "選擇時間",
    data: "time_field"
}, {
    type: "combo_selector",
    text_title: "請選擇一個選項",
    data: ["選項1", "選項2", "選項3"]
}, {
    type: "text",
    text: "我是純文字"
}
];

(async function () {
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
        combo_selector: "component/combo_selector.html",
        text: "component/text.html"
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

        // 逐一處理數據並使用緩存的組件
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            const component = componentsCache[item.type];

            if (!component) {
                console.error(`Unknown type or failed to preload: ${item.type}`);
                continue; // 跳過未知類型或未加載的組件
            }

            const $component = $(component).clone(); // 克隆以避免修改原始緩存
            formContainer.append($component);

            // 根據類型處理元件內容
            switch (item.type) {
                case "string":
                    text_label($component, item, index);
                    break;
                case "multiple_selector":
                    multiple_selector($component, item, index);
                    break;
                case "single_selector":
                    single_selector($component, item, index);
                    break;
                case "url":
                    urlc($component, item, index);
                    break;
                case "date":
                    dates($component, item, index);
                    break;
                case "textarea":
                    textarea($component, item, index);
                    break;
                case "time":
                    timepicker($component, item, index);
                    break;
                case "combo_selector":
                    combo_selector($component, item, index);
                    break;
                case "text":
                    only_text($component, item, index);
                    break;
            }
        }
    } catch (error) {
        console.error("Error in preloading components or rendering form:", error);
    }
})();
