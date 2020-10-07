import pandas

excel_data_fragment = pandas.read_excel('colocar archivo excel', sheet_name='Sheet')

json_str = excel_data_fragment.to_json()

print('Excel transofmado a Json:\n', json_str)