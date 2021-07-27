# from random import randrange, randint, sample, choices
# import string
# import re
# from io import StringIO
# from contextlib import redirect_stdout
#
#
# def convert_to_code(code, input):
#     function_name = re.findall(r'\s([a-zA-Z]*_*[a-zA-Z])', code)
#     code = 'case = ' + input + '\n' + code + f'\nprint({function_name[0]}(case))'
#     return exec(code)
#
#
# def python_driver(creator_code, user_code, result_type, case_amount, min, max, element_amount):
#     if result_type is 'list':
#         for i in range(case_amount):
#             case = sample(range(min, max), element_amount)
#             correct = convert_to_code(creator_code, case)
#             user = convert_to_code(user_code, case)
#             return 'The results are identical' if correct == user else 'The results are not identical'
#
#     elif result_type is 'int':
#         for i in range(case_amount):
#             case = randint(min, max)
#             correct = convert_to_code(creator_code, case)
#             user = convert_to_code(user_code, case)
#             return 'The results are identical' if correct == user else 'The results are not identical'
#
#     elif result_type is 'string':
#         for i in range(case_amount):
#             case = ''.join(choices(
#                 string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation + string.whitespace,
#                 k=element_amount))
#             correct = convert_to_code(creator_code, case)
#             user = convert_to_code(user_code, case)
#             return 'The results are identical' if correct == user else 'The results are not identical'
#
