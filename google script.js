const POST_URL = "WEBBHOOK URL";

function onSubmit(e) {
    const response = e.response.getItemResponses();
    let items = [];

    for (const responseAnswer of response) {
        const question = responseAnswer.getItem().getTitle();
        const answer = responseAnswer.getResponse();
        let parts = []

        try {
            parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            parts = answer;
        }

        if (!answer) {
            continue;
        }

        for (const [index, part] of Object.entries(parts)) {
            if (index == 0) {
                items.push({
                    "name": question,
                    "value": part,
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": part,
                    "inline": false
                });
            }
        }
    }

    const options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "‌",
            "embeds": [{
                "title": "Some nice title here",
                "color": 33023, // This is optional, you can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
                "fields": items,
                "footer": {
                    "text": "Some footer here"
                },
                "timestamp": new Date().toISOString()
            }]
        })
    };
  var timeout = true
  while(timeout)
  {
    try
    {
      UrlFetchApp.fetch(POST_URL, options);
      timeout = false
    }
    catch(e){Utilities.sleep(1500)}
  }
};
