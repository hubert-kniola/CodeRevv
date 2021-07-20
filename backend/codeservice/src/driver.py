from random import randrange, randint, sample, choices
import string
import re


def convert_to_code(code, input):
    function_name = re.findall(r'\s([a-zA-Z]*.*[a-zA-Z])', code)
    code = 'case = ' + input + '\n' + code + f'\nprint({function_name[0]}(case))'
    return exec(code)


def universal_driver(creator_code, user_code, type):
    if type is 'list':
        for i in range(10):
            case = sample(range(0, 100), 10)
            correct = convert_to_code(creator_code, case)
            user = convert_to_code(user_code, case)
            assert correct == user, False

    elif type is 'int':
        for i in range(10):
            case = randint(0, 100)
            correct = convert_to_code(creator_code, case)
            user = convert_to_code(user_code, case)
            assert correct == user, False

    elif type is 'string':
        for i in range(10):
            case = ''.join(choices(string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation + string.whitespace, k=100))
            correct = convert_to_code(creator_code, case)
            user = convert_to_code(user_code, case)
            assert correct == user, False
