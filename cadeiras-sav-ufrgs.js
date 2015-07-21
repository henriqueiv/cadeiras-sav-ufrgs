var texto = "SUPOSTAMENTE você cursará: \n\n";
$('[id^="tabbed_nome_atividade"').find("h2").each(function(i, obj) {
	temp = obj.innerText;
	temp = temp.replace(/(\r\n|\r|\n)+/g, '$1');
	texto += (++i) + " - " + temp.replace(/\s+/g, ' ') + ";\n";
});
alert(texto);
