const single_selector = (component, data, index) => {
    const $component = $(component); // 確保只操作當前元件
    $component.data("id", index);
    // $component.attr("data-id", index);

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
    $component.data("id", index);
    // $component.attr("data-id", index);

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
    $component.data("id", index);
    // $component.attr("data-id", index);

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
    $component.data("id", index);
    // $component.attr("data-id", index);

    $component.append(`
        <div class="mb-3">
            <label for="string-input" class="form-label">${data.text}</label>
        </div>
    `);
    $component.removeClass("ungenerate");
};
const urlc = (component, data, index) => {
    const $component = $(component);
    $component.data("id", index);
    // $component.attr("data-id", index);

    $component.append(`
        <label class="form-label">${data.text_title}</label>
        <a href="${data.url}" target="_blank" class="url">${data.url_text}</a>
    `);
    $component.removeClass("ungenerate");
};

const dates = (component, data, index) => {
    const $component = $(component);
    $component.data("id", index);
    // $component.attr("data-id", index);

    $component.find(".form-label").text(data.text_title);
    $component.find("input").attr("id", `${index}`);
    $component.removeClass("ungenerate");
};
const textarea = (component, data, index) => {
    const $component = $(component);
    $component.data("id", index);
    // $component.attr("data-id", index);

    $component.find(".form-label").text(data.text_title);
    $component.find("textarea").attr("id", `${index}`);
    $component.removeClass("ungenerate");
};
const timepicker = (component, data, index) => {
    const $component = $(component);
    $component.data("id", index);
    // $component.attr("data-id", index);

    $component.find(".form-label").text(data.text_title);
    $component.find("input").attr("id", `${index}`);
    $component.removeClass("ungenerate");
};
const combo_selector = (component, data, index) => {
    const $component = $(component);
    // 使用 .data() 存儲索引值
    $component.data("id", index);
    // 使用 .data() 儲存文字標題
    $component.find(".form-label").text(data.text_title).data("text_title", data.text_title);
    // 找到 select 元素並使用 .data() 儲存相關數據
    const $select = $component.find("select").data("id", `${data.data}_${index}`).empty(); // 清空選項

    // 動態生成選項並使用 .data() 存儲選項值
    data.data.forEach(option => {
        const $option = $(`<option value="${option}">${option}</option>`).data("value", option);
        $select.append($option);
    });
    // 使用 .data() 儲存生成狀態
    $component.data("generated", true);
    // 移除初始化樣式
    $component.removeClass("ungenerate");
};

// let datas= "eyJ0aXRsZSI6IuaomemhjCIsImZvcm0iOlt7InR5cGUiOiJ0ZXh0IiwidGV4dCI6IuaIkeaYr+aWh+WtlyJ9LHsidHlwZSI6InN0cmluZyIsInRleHRfdGl0bGUiOiLmqJnpoYwiLCJkYXRhIjoidGV4dCJ9LHsidHlwZSI6Im11bHRpcGxlX3NlbGVjdG9yIiwidGV4dF90aXRsZSI6InRleHQiLCJkYXRhIjpbIkEiLCJCIiwiQyIsIkQiXX0seyJ0eXBlIjoic2luZ2xlX3NlbGVjdG9yIiwidGV4dF90aXRsZSI6IlRlc3QiLCJkYXRhIjpbIkMiLCJEIiwiVyIsIkEiXX0seyJ0eXBlIjoidXJsIiwidGV4dF90aXRsZSI6InVybF90aXRsZSIsInVybF90ZXh0IjoidXJsX3RleHQiLCJ1cmwiOiJodHRwczovL2dvb2dsZS5jb20ifSx7InR5cGUiOiJkYXRlIiwidGV4dF90aXRsZSI6IkRBVEUifSx7InR5cGUiOiJ0ZXh0YXJlYSIsInRleHRfdGl0bGUiOiJ0ZXh0YXJlYSJ9LHsidHlwZSI6InRpbWUiLCJ0ZXh0X3RpdGxlIjoidGltZSJ9LHsidHlwZSI6ImNvbWJvX3NlbGVjdG9yIiwidGV4dF90aXRsZSI6ImNvbWJvYm94c3NzcyIsImRhdGEiOlsiQSIsIkIiLCJDIiwiRCJdfV19";
function base64ToUtf8(base64) {
    return decodeURIComponent(atob(base64).split('').map(c =>
        '%' + c.charCodeAt(0).toString(16).padStart(2, '0')
    ).join(''));
}

// const data = JSON.parse(base64ToUtf8(datas));

// (async function () {
//     const componentsCache = {}; // 用於緩存已加載的組件
//     const formContainer = $('#form-container'); // 表單容器
//     formContainer.data("id","ABC08751");
//     // 預定義所有需要的組件路徑
//     const componentUrls = {
//         string: "component/text_label.html",
//         multiple_selector: "component/multiple-selector.html",
//         single_selector: "component/single-selector.html",
//         url: "component/url.html",
//         date: "component/dates.html",
//         textarea: "component/textarea.html",
//         time: "component/time.html",
//         combo_selector: "component/combo_selector.html",
//         text: "component/text.html"
//     };
//     $(".form_title").text(data.title);
//     try {
//         // 預先載入所有組件
//         await Promise.all(
//             Object.entries(componentUrls).map(async ([type, url]) => {
//                 try {
//                     const component = await $.get(url);
//                     componentsCache[type] = component; // 緩存組件
//                 } catch (error) {
//                     console.error(`Failed to load component from ${url}`, error);
//                 }
//             })
//         );

//         // 逐一處理數據並使用緩存的組件
//         for (let index = 0; index < data.form.length; index++) {
//             const item = data.form[index];
//             const component = componentsCache[item.type];

//             if (!component) {
//                 console.error(`Unknown type or failed to preload: ${item.type}`);
//                 continue; // 跳過未知類型或未加載的組件
//             }

//             const $component = $(component).clone(); // 克隆以避免修改原始緩存
//             formContainer.append($component);

//             // 根據類型處理元件內容
//             switch (item.type) {
//                 case "string":
//                     text_label($component, item, index);
//                     break;
//                 case "multiple_selector":
//                     multiple_selector($component, item, index);
//                     break;
//                 case "single_selector":
//                     single_selector($component, item, index);
//                     break;
//                 case "url":
//                     urlc($component, item, index);
//                     break;
//                 case "date":
//                     dates($component, item, index);
//                     break;
//                 case "textarea":
//                     textarea($component, item, index);
//                     break;
//                 case "time":
//                     timepicker($component, item, index);
//                     break;
//                 case "combo_selector":
//                     combo_selector($component, item, index);
//                     break;
//                 case "text":
//                     only_text($component, item, index);
//                     break;
//             }
//         }
//     } catch (error) {
//         console.error("Error in preloading components or rendering form:", error);
//     }
// })();
