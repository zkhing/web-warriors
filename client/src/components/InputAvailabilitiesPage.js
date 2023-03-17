const InputAvailabilitiesPage = () => {
    const handleClick = async () => {
        const date = document.getElementById("date").value;
        const from_time = document.getElementById("from_time").value;
        const to_time = document.getElementById("to_time").value;
        console.log(date);
        console.log(from_time);
        console.log(to_time);

        const response = await fetch(`api/InputAvailabilitiesPage?date=${date}&from_time=${from_time}&to_time=${to_time}`, {
            method: "get",
            headers: {
                "Content_type": "application/json",
            },

        });
        const data = await response.json();
        console.log(data);
        if (data.length > 0) {
            let temp = "";

            data.forEach((user) => {
                temp += "<tr>";
                temp += "<td>" + user.username + "<td>";
                temp += "<td>" + user.date + "<td>";
                temp += "<td>" + user.from_time + "<td>";
                temp += "<td>" + user.to_time + "<td>";
            });
            document.getElementById("tbody").innerHTML = temp;

        } else {
            alert("No availability matching your availability");
        }
    };

    return (
        <div>
            <form>
                <label htmlFor="date"> Available Date</label>
                <input type="date" id="date"></input>
                <label htmlFor="from"> From </label>
                <input type="time" id="from_time"></input>
                <label htmlFor="to">To</label>
                <input type="time" id="to_time"></input>
            </form>
            <br></br>
            <table className="table" >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                    </tr>
                </thead>
                <tbody id="tbody">

                </tbody>
            </table >

            <button onClick={handleClick}>Send</button>
        </div>
     );
};
export default InputAvailabilitiesPage;