$("#submit_data").on('click',async function () {
    const container = $(".child-container");
    let form_id = String($("#form-container").data("id"));
    let ret_data = [];
    for (let i = 0; i < container.length; i++) {
        let child = $(container[i]);
        let data_type = child.data("type");
        if (
            data_type == "string" ||
            data_type == "date" ||
            data_type == "textarea" ||
            data_type == "time") {
            ret_data.push({
                data_type: data_type,
                data: child.find("input").val() || child.find("textarea").val()
            })
        }
        if (data_type == "multiple_selector") {
            let inputs = [];
            // 找到所有被選中的 radio
            child.find(".form-check-input:checked").each(function () {
                inputs.push($(this).val()); // 將每個選中的值加入陣列
            });

            ret_data.push({
                data_type: data_type,
                data: inputs // 將多筆資料存入
            });
        }
        if (data_type == "single_selector") {
            let inputs = child.find(".form-check-input:checked").val();
            ret_data.push({
                data_type: data_type,
                data: inputs
            })
        }
        if (data_type == "combo_selector") {
            let select = child.find(".form-select").val();
            ret_data.push({
                data_type: data_type,
                data: select
            })
        }
    }
    let Full_data = {
        form_id: form_id,
        ret_data: ret_data
    }
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
    let base64String = utf8ToBase64(JSON.stringify(Full_data));
    // 輸出 Base64 編碼和解碼後的原始資料
    console.log("Base64 編碼：", base64String);
    let result = await $.ajax({
        type:"POST",
        url:"https://dingdingstudio.serveminecraft.net/publics/post_data",
        data:{base64:base64String}
    })
    console.log(result);
    // 將 Base64 解碼回原始資料
    let decodedData = JSON.parse(base64ToUtf8(base64String));
    console.log("解碼後的資料：", decodedData);
})