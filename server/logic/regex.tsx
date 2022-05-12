const patterns = {
  email:
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
  //   Minimum eight characters, at least one letter, one number and one special character:
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};

/** 
Regex Docs:
    For testing you can go to https://regex101.com/ and play around.
    For more documentation you can go to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    Email:
        ?: will not capture the group it is in. Example:
            @string http://localhost:5000
            @regex = /^(?:http)://(localhost:5000)$/
            @returns 
                @group_1 : localhost:5000
            Compare now to not using it.
            @string http://localhost:5000
            @regex = /^(http)://(localhost:5000)$/
            @returns
                @group_1 : http
                @group_2 : localhost:5000

        + will match one or more accurances. Example:
            @string 1332
            @regex = /^[1-9]+$/
            @returns
                @match : 1332
            Compare now to not using it.
            @returns
                @match : 1     --- It only matches the first good match as opposed to ONE or MORE

        * will match zero or more accurances. Just like @regex = + but instead of 1 it also matches 
            0 (no values). So in the previous example, the string could be blank and it would still get a valid match

        | will match between 2 groups. It is like an OR. Example:
            @string a3
            @regex = /^a|3$/
            @returns
                @match : a
            @string 3a
            @regex = a|3
                @match : 3

        \x?? are hexadecimal values

        [\x??-\x??] are a range of hexadecimal values. Just like 0-9 but with hexadecimals.

        \\ since \ is an escape character, this regex means we want to escape the character \ 
            Example:
            @string hello\
            @regex = /^([a-z\\]){1,100}$/
            @returns
                @match : hello\
        
        ? means the block before this character is optional. Example:
            @string b2 @string b
            @regex = /^(a-z)(0-9)?$/
            @returns
                @match_one : b2
                @match_two : b
            Compare now if we do not use the ? character.
            @string b2 @string b
            @regex = /^(a-z)(0-9)$/
            @returns
                @match : b2      --    We only have a match, because we need a number after the letter 'b'

        {n} means we want the preceding block to have a length of n(n is a number, i just used it to showcase any number can be used). Example:
            @string bbb @string bbbb
            @regex = /^[a-z]{3}$/
            @returns
                @match_one : bbb
                @match_two : bbb     - The last b is not in the match because otherwise it would have  a length of 4.

        {x,n} means the length must be at least x (inclusive) and must not exceed n (inclusive)   
        
        ?= is a zero-width positive lookahead assertion. This means that it checks everything needs to be checked before it, but after it as well, however what is matched after ?= is NOT included in the matched block. Example:
            @string file4.txt
            @regex = /\d+(?=\.\w+$)/
            @returns
                @match : 4    --- Even if 4.txt is valid, only 4 is a match.
*/

export default patterns;
