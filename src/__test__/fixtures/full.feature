# language: en
#language: en
#language:en
# asdhakjhsdaskj
@root
Feature: Root feature
    Test description
    Rule: Normal
        Background: a simple background
            Given the minimalism inside a background

        @scenario-two-lines
        Scenario: two lines
            This description
            has two lines and indented with two spaces
            Given the minimalism

        @scenario-pickles-up
        Scenario: still pickles up
            Given the minimalism
            * a step

    Rule: Datatable
        Scenario: some whitespace is important
            And a data **table** with a single cell
                | foo |
            Given a simple data table
                | foo | bar |
                | boz | boo |
            And a data table with different fromatting
                | foo | bar | boz |

    Rule: Docstrings
        Scenario: minimalistic
            Given a simple DocString
                """
                first line (no indent)
                second line (indented with two spaces)

                third line was empty
                """

    Rule: Examples
        Scenario Outline: the <one>
            Given the <two>:
                """
                <three>
                """
            Given a simple data table
                | foo | bar |
                | boz | boo |
            Given a <color1> ball with:
            Examples:
                | color1 |
                | red    |
            Examples:
                | color2 |
                | green  |

    Rule: Scenario Outline
        Scenario Outline: Greetings come in many forms
            Given this file:
                """<type>
                Greeting:<content>
                """
            Examples:
                | type | content |
                | en   | Hello   |
                | fr   | Bonjour |

    Rule: Variable
        Scenario Outline: Greetings come in many forms
            When I does not have any variable
            And I have text "abc" wrap by quotation marks
            And I have text 'def' wrap by punctuation marks
            And I have text <ghi> wrap by sign mark
            And I have text "<jkl>" wrap by quotation and sign mark
            And I have int 10
            And I have float 10.20
            And I have int 20 and float 30.40
            And I have int 50 and float 50.60, string "bdf"

