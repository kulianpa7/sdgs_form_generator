$("#generate_from_form").on('click', function () {
    let container = $('.child-container');
    let datas = {title:"","form":[]};
    datas["title"] = $(".title_s").val();
    // 遍歷 child-container 並生成資料
    for (let i = 0; i < container.length - 1; i++) {
        let element = $(container[i]); // 將 DOM 節點轉換為 jQuery 物件
        datas["form"].push(generate(element.data("type"), element));
    }
    // 將 datas 轉換為 JSON 字串
    let jsonString = JSON.stringify(datas);

    // 解決非 Latin1 字符問題
    function utf8ToBase64(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => 
            String.fromCharCode(parseInt(p1, 16))
        ));
    }

    function base64ToUtf8(base64) {
        return decodeURIComponent(atob(base64).split('').map(c => 
            '%' + c.charCodeAt(0).toString(16).padStart(2, '0')
        ).join(''));
    }

    // 將 JSON 字串轉為 Base64 編碼
    let base64String = utf8ToBase64(jsonString);

    // 輸出 Base64 編碼和解碼後的原始資料
    console.log("Base64 編碼：", base64String);

    // 將 Base64 解碼回原始資料
    let decodedData = JSON.parse(base64ToUtf8(base64String));
    console.log("解碼後的資料：", decodedData);
});

const combo_selector = ($element) => {
    let formLabel = $element.find(".form-label input"); // 儲存 .form-label
    let comboInputs = $element.find(".combo_child input"); // 儲存 .combo_child 下的所有 input
    let ret_data = {
        type: "combo_selector",
        text_title: formLabel.val(), // 使用 .text() 獲取文字
        data: comboInputs.map((index, input) => $(input).val()).get() // 獲取所有 input 的值並轉換為陣列
    };
    return ret_data; // 返回結果
};

const dates = ($element) =>{
    let text = $element.find(".form-label input"); // 儲存 .form-label
    let ret_data = {
        type: "date",
        text_title: text.val()
    };
    return ret_data; // 返回結果
}
const multiple_selector = ($element) =>{
    let formLabel = $element.find(".form-label input"); // 儲存 .form-label
    let comboInputs = $element.find(".multiple_child input"); // 儲存 .combo_child 下的所有 input
    let ret_data = {
        type: "multiple_selector",
        text_title: formLabel.val(), // 使用 .text() 獲取文字
        data: comboInputs.map((index, input) => $(input).val()).get() // 獲取所有 input 的值並轉換為陣列
    };
    return ret_data; // 返回結果
}
const single_selector = ($element) =>{
    let formLabel = $element.find(".form-label input"); // 儲存 .form-label
    let comboInputs = $element.find(".single_child input"); // 儲存 .combo_child 下的所有 input
    let ret_data = {
        type: "single_selector",
        text_title: formLabel.val(), // 使用 .text() 獲取文字
        data: comboInputs.map((index, input) => $(input).val()).get() // 獲取所有 input 的值並轉換為陣列
    };
    return ret_data; // 返回結果
}
const text_label = ($element) => {
    let text = $element.find(".form_label-title"); // 選取文字標題的輸入框
    let placeholder = $element.find(".form-label-placeholder"); // 選取提示文字的輸入框
    let ret_data = {
        type: "string",
        text_title: text.val(), // 提取標題的值
        data: placeholder.val() // 提取提示文字的值
    };
    return ret_data; // 返回結果
};

const text = ($element) =>{
    let text = $element.find("textarea"); // 儲存 .form-label
    let ret_data = {
        type: "text",
        text: text.val()
    };
    return ret_data; // 返回結果
}
const textarea = ($element) =>{
    let text = $element.find(".form-label input"); // 儲存 .form-label
    let ret_data = {
        type: "textarea",
        text_title:text.val()
    };
    return ret_data; // 返回結果
}
const time = ($element) =>{
    let text = $element.find(".form-label input"); // 儲存 .form-label
    let ret_data = {
        type: "time",
        text_title: text.val()
    };
    return ret_data; // 返回結果
}
const url = ($element) =>{
    let url_title = $element.find(".form-label .url_title"); // 儲存 .form-label
    let url_text = $element.find(".form-label .url_text"); // 儲存 .form-label
    let url = $element.find(".form-label .url"); // 儲存 .form-label
    let ret_data = {
        type: "url",
        text_title: url_title.val(),
        url_text: url_text.val(),
        url: url.val()
    };
    return ret_data;
}
const generate = (data,$element)=>{
    switch(data){
        case("combo_selector"):
            return combo_selector($element);
            break;
        case("date"):
            return dates($element);
            break;
        case("multiple_selector"):
            return multiple_selector($element)
            break;
        case("single_selector"):
            return single_selector($element)
            break;
        case("text_label"):
            return text_label($element)
            break;
        case("text"):
            return text($element)
            break;
        case("textarea"):
            return textarea($element)
            break;
        case("time"):
            return time($element)
            break;
        case("url"):
            return url($element)
            break;
    }
}