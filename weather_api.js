$(function currentWeather() {
    $('#getWeather').click(function () {
        const location = $('#city').val();
        if (location.length > 0) {
            $.get('http://localhost:3000/current/weather_api', {
                'location': location
            }).done(function success(response) {
                let image_src = response.icon
                image_src = `https:${image_src}`
                console.log(image_src)
                $('#current_update').html(`
                    <img src="${image_src}" alt='weather image'>
                    <p> ${response.name}, ${response.region}, ${response.country} </p>
                    <p> ${response.localTime} </p>
                    <p> ${response.temp_in_celcius} °C </p>
                    <p> Condition: ${response.condition} </p>
                    <p> Wind Speed: ${response.wind_in_kmph} km/h </p>
                    <b> Source: weatherAPI </b>
                `);
            }).fail(function error(xhr, error, message) {
                if (xhr.status === 400) {
                    $('#current_update').html(`
                        <p>Sorry the location was incorrect or could not be found</p>
                        `
                    )
                }
                else{
                    $('#current_update').html(`
                        <p>Sorry an internal server error occured </p>
                        `)
                }
            })
        }
    })
})