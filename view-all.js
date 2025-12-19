// Connect to portfolio database
db = db.getSiblingDB("portfolio");

print("=== YOUR PORTFOLIO DATABASE ===");
print("Total contacts: 12");
print("");

print("📊 ALL 12 CONTACTS:");
print("===================");

let counter = 1;
db.contacts.find().sort({_id: -1}).forEach(contact => {
    print("[" + counter + "] " + contact.name.toUpperCase());
    print("    Email: " + contact.email);
    print("    Subject: " + (contact.subject || "No Subject"));
    print("    Message: " + contact.message.substring(0, 50) + "...");
    print("    Date: " + contact.date);
    print("    Has JWT Token: " + (contact.token ? "✅ YES" : "❌ NO"));
    
    if (contact.token) {
        print("    Token: " + contact.token.substring(0, 30) + "...");
    }
    print("");
    counter++;
});

print("");
print("📈 STATISTICS:");
let withTokens = db.contacts.countDocuments({token: {$ne: null}});
print("Contacts with JWT tokens: " + withTokens + " / 12");
print("Contacts without tokens: " + (12 - withTokens) + " / 12");