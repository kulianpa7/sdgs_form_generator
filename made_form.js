
(async function () {
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
    const componentsCache = {}; // 用於緩存已加載的組件
    const formContainer = $('#form-container'); // 表單容器
    // 預定義所有需要的組件路徑
    const componentUrls = {
        string: "make_component/text_label.html",
        multiple_selector: "make_component/multiple-selector.html",
        single_selector: "make_component/single-selector.html",
        url: "make_component/url.html",
        date: "make_component/dates.html",
        textarea: "make_component/textarea.html",
        time: "make_component/time.html",
        combo_selector: "make_component/combo_selector.html",
        text: "make_component/text.html",
        generator_btn: "make_component/generator_btn.html"
    };
    try {
        // 預先載入所有組件
        await Promise.all(
            Object.entries(componentUrls).map(async ([type, url]) => {
                try {
                    const component = await $.get(url);
                    componentsCache[type] = component; // 緩存組件
                } catch (error) {
                    console.error(`Failed to load make_component from ${url}`, error);
                }
            })
        );
    } catch (error) {
        console.error("Error in preloading components or rendering form:", error);
    }
    let base64STR = "eyJ0aXRsZSI6IuaomemhjCIsImZvcm0iOlt7InR5cGUiOiJ0ZXh0IiwidGV4dCI6IuaIkeaYr+aWh+WtlyJ9LHsidHlwZSI6InN0cmluZyIsInRleHRfdGl0bGUiOiLmqJnpoYwiLCJkYXRhIjoidGV4dCJ9LHsidHlwZSI6Im11bHRpcGxlX3NlbGVjdG9yIiwidGV4dF90aXRsZSI6InRleHQiLCJkYXRhIjpbIkEiLCJCIiwiQyIsIkQiXX0seyJ0eXBlIjoic2luZ2xlX3NlbGVjdG9yIiwidGV4dF90aXRsZSI6IlRlc3QiLCJkYXRhIjpbIkMiLCJEIiwiVyIsIkEiXX0seyJ0eXBlIjoidXJsIiwidGV4dF90aXRsZSI6InVybF90aXRsZSIsInVybF90ZXh0IjoidXJsX3RleHQiLCJ1cmwiOiJodHRwczovL2dvb2dsZS5jb20ifSx7InR5cGUiOiJkYXRlIiwidGV4dF90aXRsZSI6IkRBVEUifSx7InR5cGUiOiJ0ZXh0YXJlYSIsInRleHRfdGl0bGUiOiJ0ZXh0YXJlYSJ9LHsidHlwZSI6InRpbWUiLCJ0ZXh0X3RpdGxlIjoidGltZSJ9LHsidHlwZSI6ImNvbWJvX3NlbGVjdG9yIiwidGV4dF90aXRsZSI6ImNvbWJvYm94IiwiZGF0YSI6WyJBIiwiQiIsIkMiLCJEIl19XX0=";
    // 將 Base64 解碼回原始資料
    let decodedData = JSON.parse(base64ToUtf8(base64STR));
    console.log("解碼後的資料：", decodedData);
    $("#form-container").empty();
    $("#form_title").val(decodedData.title);
    for (let i = 0; i < decodedData.form.length; ++i) {
        let form = decodedData.form[i];
        let form_container = $("#form-container");
        if (componentsCache[form.type]) {
            let $containers = $(componentsCache[form.type]);
            switch (form.type) {
                case ("text"):
                    $containers.find("#textarea-input").val(form.text);
                    break;
                case ("string"):
                    $containers.find(".form_label-title").val(form.text_title);
                    $containers.find(".form-label-placeholder").val(form.data);
                    break;
                case ("multiple_selector"):
                    $containers.find(".form_label").val(form.text_title);
                    for (let j = 0; j < form.data.length; ++j) {
                        $containers.find(".multipler").append(
                            `
                <div class="multiple_child">
                    <label for="close" class="close">X</label>
                    <input type="text" placeholder="輸入選項" value="${form.data[j]}">
                </div>
                `
                        )
                    }
                    break;
                case ("single_selector"):
                    $containers.find(".form_label").val(form.text_title);
                    for (let j = 0; j < form.data.length; ++j) {
                        $containers.find(".singler").append(
                            `
                <div class="single_child">
                    <label for="close" class="close">X</label>
                    <input type="text" placeholder="輸入選項" value="${form.data[j]}">
                </div>
                `
                        )
                    }
                    break;
                case ("url"):
                    $containers.find(".url_title").val(form.text_title);
                    $containers.find(".url_text").val(form.url_text);
                    $containers.find(".url").val(form.url);
                    break;
                case ("date"):
                    $containers.find(".form_label").val(form.text_title);
                    break;
                case ("textarea"):
                    $containers.find(".form_label").val(form.text_title);
                    break;
                case ("time"):
                    $containers.find(".form_label").val(form.text_title);
                    break;
                case ("combo_selector"):
                    $containers.find(".form_label").val(form.text_title);
                    for (let j = 0; j < form.data.length; ++j) {
                        $containers.find(".comboboxer").append(
                            `
                <div class="combo_child">
                    <label for="close" class="close">X</label>
                    <input type="text" placeholder="輸入選項" value="${form.data[j]}">
                </div>
                `
                        )
                    }
                    break;
            }
            form_container.append(
                $containers
            )
        } else {
            console.error("沒有 ", form.type, " 型態");
        }
    }

    $(document).on('click', '.d-flex .close', function () {
        $(this).closest('.child-container').remove();
    });
})()