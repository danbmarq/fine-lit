function startOver() {
    document.loan_form.loan_amt.value="15000";
    document.loan_form.periods.value="3";
    document.loan_form.int_rate.value="4.0";
    document.loan_form.extra_pmt.value="0";

    document.getElementById("loan_info").innerHTML="";
    document.getElementById("table").innerHTML="";
}

function validate() {
    
    var loan_amt = document.loan_form.loan_amt.value; 
    var periods = document.loan_form.periods.value;
    var int_rate = document.loan_form.int_rate.value;
    var extra_pmt = document.loan_form.extra_pmt.value;
    
    if(loan_amt <= 0 || isNaN(Number(loan_amt)) ) {
        alert("Enter a valid loan amount.");
        document.loan_form.loan_amt.value="";
    }

    else if(periods <= 0 || parseInt(periods) != periods) {
        alert("Enter a valid number of periods.");
        document.loan_form.periods.value="";
    }
    else if(int_rate <= 0 || isNaN(Number(int_rate)) ) {
        alert("Enter a valid interest rate number.");
        document.loan_form.int_rate.value="";
    }
    else if(extra_pmt < 0 || isNaN(Number(extra_pmt))) {
        alert("Enter a valid amount of extra payments.");
        document.loan_form.extra_pmt.value="0";
    }
    else {
        calculate(parseFloat(loan_amt), parseInt(periods), parseFloat(int_rate), parseFloat(extra_pmt));
    }
}

function calculate(loan_amt, periods, int_rate, extra_pmt) {
    i = (int_rate/12)/100;
    p = periods * 12

    var pmt = loan_amt*(i)*Math.pow((1+i), p) / (Math.pow((1+i), p) - 1);

    var payment = pmt.toFixed(2);

    var pmt_extra = extra_pmt + pmt

    var f = function thousands_separators(num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    var info="";

    info += "<table class='table-responsive-sm'>";
    info += "<tr><td>Loan Amount:</td>";
    info += "<td align='right'> $"+ f(loan_amt) +"</td></tr>"
    info += "<tr><td>Number of Periods:</td>";
    info += "<td align='right'>"+ p +"</td></tr>"
    info += "<tr><td>Interest Rate:</td>";
    info += "<td align='right'>"+int_rate +"%</td></tr>"
    info += "<tr><td>Extra Payment:</td>";
    info += "<td align='right'>$"+f(extra_pmt) +"</td></tr>"
    info += "<tr><td>Payment per Period:</td>";
    info += "<td align='right'> $"+ f(payment) +"</td></tr>"
    info += "<tr><td>Payment with Extra:</td>";
    info += "<td align='right'> $"+ f(pmt_extra.toFixed(2)) +"</td></tr>"
    info += "</table>";

    document.getElementById("loan_info").innerHTML = info;

    var table="";

    table += "<table cellpadding='10' border='2.25px' class='table-responsive-sm table-striped'>";

    var current_balance = loan_amt;
    var counter = 1;
    var total_interest = 0;

    while(current_balance>0) {
        towards_int = (i)*current_balance;
        towards_balance = pmt_extra.toFixed(2) - towards_int;
        towards_balance = towards_balance.toFixed(2)
        current_balance = current_balance - towards_balance;
        current_balance = current_balance.toFixed(2)
        total_interest = total_interest + towards_int;

        table += "<tr class='calc_table'>";
        table += "<td align='center'>$ "+ f(pmt_extra.toFixed(2)) +"</td>";
        table += "<td align='center'>$ "+ f(towards_balance) +"</td>";
        table += "<td align='center'>$ "+ f(towards_int.toFixed(2)) +"</td>";
        table += "<td align='center'>$ "+ f(total_interest.toFixed(2)) +"</td>";
        table += "<td align='center'>$ "+ f(current_balance) +"</td>";
        table += "</tr>";

        counter ++;

    }

    table += "</table>";

    document.getElementById("table").innerHTML = table;
    

}





function startOverInv() {
    document.inv_form.inv_amt.value="15000";
    document.inv_form.inv_periods.value="3";
    document.inv_form.rtrn_rate.value="8";
    document.inv_form.extra_cont.value="50";

    document.getElementById("inv_info").innerHTML="";
    document.getElementById("inv_table").innerHTML="";
}

function validateInv() {
    
    var inv_amt = document.inv_form.inv_amt.value; 
    var periods = document.inv_form.inv_periods.value;
    var rtrn_rate = document.inv_form.rtrn_rate.value;
    var extra_cont = document.inv_form.extra_cont.value;
    
    if(inv_amt <= 0 || isNaN(Number(inv_amt)) ) {
        alert("Enter a valid loan amount.");
        document.inv_form.inv_amt.value="";
    }

    else if(periods <= 0 || parseInt(periods) != periods) {
        alert("Enter a valid number of periods.");
        document.inv_form.inv_periods.value="";
    }
    else if(rtrn_rate <= 0 || isNaN(Number(rtrn_rate)) ) {
        alert("Enter a valid interest rate number.");
        document.inv_form.rtrn_rate.value="";
    } else if(extra_cont < 0 || isNaN(Number(extra_cont))) {
        alert("Enter a valid amount of extra contributions.");
        document.inv_form.extra_cont.value="0";
    }
    else {
        calculateInv(parseFloat(inv_amt), parseInt(periods), parseFloat(rtrn_rate), parseFloat(extra_cont));
    }
}

function calculateInv(inv_amt, periods, rtrn_rate, extra_cont) {
    i = (rtrn_rate/12)/100;

    p = periods*12

    var ttl_rtrn = inv_amt*Math.pow((1+i), p) + extra_cont * ((Math.pow((1+i), p+1) - (1+i))/ i);

    var ttl_cont = extra_cont*p;

    var rtrn = ttl_rtrn-inv_amt - ttl_cont;

    var f = function thousands_separators(num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };


    var info ="";

    info += "<table class='table-responsive-sm'>";
    info += "<tr><td>Initial Investment:</td>";
    info += "<td align='right'> $ "+f(inv_amt) +"</td></tr>"
    info += "<tr><td>Number of Periods:</td>";
    info += "<td align='right'>"+ periods +"</td></tr>"
    info += "<tr><td>Return Rate:</td>";
    info += "<td align='right'>"+ rtrn_rate +"%</td></tr>"
    info += "<tr><td>Total Contributions:</td>";
    info += "<td align='right'> $ "+ f(ttl_cont.toFixed(2)) +"</td></tr>"
    info += "<tr><td>Total Return:</td>";
    info += "<td align='right'> $ "+ f(rtrn.toFixed(2)) +"</td></tr>"
    info += "<tr><td>Ending Balance:</td>";
    info += "<td align='right'> $ "+ f(ttl_rtrn.toFixed(2)) +"</td></tr>"
    info += "</table>";

    document.getElementById("inv_info").innerHTML = info ;


    var table="";

    table += "<table cellpadding='10' border='2.25px' class='table-responsive-sm table-striped'>";

    var e;
    var current_balance = inv_amt;
    var counter = 1;
    var total_return = 0;

    for (e = 0; e < p; e++) {

        towards_rtrn = (i)*current_balance;
        current_balance = current_balance + towards_rtrn + extra_cont;
        total_return = total_return + towards_rtrn;
        total_cont = extra_cont*(e+1)
        var prncp = current_balance - towards_rtrn - extra_cont;

        table += "<tr class='calc_table'>";
        table += "<td align='center'>$ "+ f(prncp.toFixed(2)) +"</td>";
        table += "<td align='center'>$ "+ f(towards_rtrn.toFixed(2)) +"</td>";
        table += "<td align='center'>$ "+ f(total_cont.toFixed(2)) +"</td>";
        table += "<td align='center'>$ "+ f(total_return.toFixed(2)) +"</td>";
        table += "<td align='center'>$ "+ f(current_balance.toFixed(2)) +"</td>";
        table += "</tr>";

        counter ++;

    }

    table += "</table>";

    document.getElementById("inv_table").innerHTML = table;

}

