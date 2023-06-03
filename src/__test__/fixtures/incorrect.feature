Feature : Search functionality
    Scenario: Search with a valid keyword
        When I enter "laptop" in the search bar
        And I click the search button
        Then I should see a list of products containing "laptop"
        And the total number of results should be 10