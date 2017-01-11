function main() {
    var timeout = 2000,
        vpElements = {},
        intervalId = 0

    document.querySelectorAll('.player-name').forEach(function(n) {
        vpElements[n.innerText.trim()] = {
            element: n.parentNode.querySelectorAll('span.ttshippingpoint')[0],
            points: 0
        }
    })

    function parseLogs() {
        var logs = document.querySelectorAll('#logs .log .roundedbox:not(.parsed)'),
            regex = /\d+ victory point/,
            endRegex = /during the game/

        logs.forEach(function(next) {
            var text = next.innerText,
                result = regex.exec(text)

            // if this is true then we reached the end of the game and we don't need any more logs
            if(endRegex.test(text))
                return clearInterval(intervalId)

            if(result) {
                var points = parseInt(result[0].replace(' victory points', '')),
                    player = next.querySelectorAll('span')[0].innerText

                //add points
                vpElements[player].points += points
                vpElements[player].element.innerText = vpElements[player].points
            }

            next.classList.add('parsed')
        })
    }

    intervalId = setInterval(parseLogs, timeout);
}

main()