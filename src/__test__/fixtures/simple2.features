@web @regression
Feature: Search functionality

    As a user,
    I want to be able to search for products on the website,
    So that I can find what I need quickly and easily.

    # comment 2

    @secnario-tag
    Scenario: Search with a valid keyword
        When I enter "laptop" in the search bar
        And I click the search button
        Then I should see a list of products containing "laptop"
        And the total number of results should be 10

    Scenario Outline: Search with invalid keyword
        When I enter <keyword> in the search bar
        And I click the search button
        Then I should see an error message

        Examples:
            | keyword   |
            | 12345     |
            | $%^&*     |
            | "invalid" |
